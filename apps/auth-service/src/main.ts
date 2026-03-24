import express from 'express';
import * as path from 'path';
import { PrismaClient } from './generated/client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import { authMiddleware, AuthenticatedRequest } from '../../../libs/shared/authMiddleware';

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter: adapter as any } as any);
const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) {
  console.error("FATAL ERROR: JWT_SECRET environment variable is not set.");
  process.exit(1);
}

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Register
app.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2);
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'customer',
        emailVerified: false,
        verificationToken,
        verificationTokenExpires,
      },
    });

    // In a real application, send verification email here
    console.log(`Verification token for ${email}: ${verificationToken}`);
    console.log(`Verification link: http://localhost:3000/verify-email?token=${verificationToken}`);

    const { password: _, verificationToken: __, verificationTokenExpires: ___, ...userWithoutSensitive } = user;
    res.json({
      ...userWithoutSensitive,
      message: 'Registration successful. Please verify your email.',
      note: 'In development, verification token is logged to console'
    });
  } catch (error) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(403).json({
        error: 'Email not verified',
        code: 'EMAIL_NOT_VERIFIED',
        message: 'Please verify your email before logging in'
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      // Create temporary token for 2FA verification
      const tempToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: '5m' }
      );
      res.json({ requires2FA: true, tempToken });
    } else {
      const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, {
        expiresIn: '1h',
      });
      res.json({ token });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// 2FA login verification
app.post('/login-2fa', async (req, res) => {
  const { tempToken, token } = req.body;

  if (!tempToken || !token) {
    return res.status(400).json({ message: 'tempToken and token are required' });
  }

  try {
    // Verify tempToken
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET!) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: parseInt(decoded.userId) } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify TOTP token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret!,
      encoding: 'base32',
      token,
      window: 1
    });

    if (!verified) {
      return res.status(401).json({ message: 'Invalid verification code' });
    }

    // Issue final JWT
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.json({ accessToken });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Temporary token expired' });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid temporary token' });
    }
    console.error('2FA login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Send verification email
app.post('/send-verification', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    // Generate verification token (simple UUID for demo)
    const verificationToken = Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2);
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.user.update({
      where: { email },
      data: {
        verificationToken,
        verificationTokenExpires,
      },
    });

    // In a real application, send email here
    console.log(`Verification token for ${email}: ${verificationToken}`);
    console.log(`Verification link: http://localhost:3000/verify-email?token=${verificationToken}`);

    res.json({
      message: 'Verification email sent',
      note: 'In development, token is logged to console'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

// Verify email with token
app.post('/verify-email', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationTokenExpires: null,
      },
    });

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify email' });
  }
});

// 2FA endpoints
app.post('/2fa/setup', authMiddleware as any, async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.twoFactorEnabled) {
      return res.status(400).json({ message: '2FA already enabled' });
    }

    // Generate secret
    const secret = speakeasy.generateSecret({ length: 20 });

    // Update user with 2FA secret
    await prisma.user.update({
      where: { id: userId },
      data: { twoFactorSecret: secret.base32 }
    });

    // Generate QR code URL
    const otpauthUrl = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `NextGenApp:${user.email}`,
      issuer: 'NextGen',
      encoding: 'base32'
    });

    const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);

    res.json({ secret: secret.base32, qrCodeDataUrl });
  } catch (error) {
    console.error('2FA setup error:', error);
    res.status(500).json({ message: 'Failed to setup 2FA' });
  }
});

app.post('/2fa/verify', authMiddleware as any, async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({ message: '2FA not set up' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1
    });

    if (!verified) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Enable 2FA for user
    await prisma.user.update({
      where: { id: userId },
      data: { twoFactorEnabled: true }
    });

    res.json({ verified: true });
  } catch (error) {
    console.error('2FA verification error:', error);
    res.status(500).json({ message: 'Failed to verify token' });
  }
});

app.post('/2fa/disable', authMiddleware as any, async (req: AuthenticatedRequest, res) => {
  const userId = req.userId;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null
      }
    });

    res.json({ disabled: true });
  } catch (error) {
    console.error('2FA disable error:', error);
    res.status(500).json({ message: 'Failed to disable 2FA' });
  }
});

// Profile endpoints
app.get('/profile', authMiddleware as any, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId;

    const profile = await prisma.profile.findUnique({
      where: { userId }
    });

    res.json(profile || {});
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/profile', authMiddleware as any, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, phone, address } = req.body;

    const profile = await prisma.profile.upsert({
      where: { userId },
      update: { firstName, lastName, phone, address },
      create: {
        firstName,
        lastName,
        phone,
        address,
        user: { connect: { id: userId } }
      }
    });

    res.json(profile);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to auth-service!' });
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
});
server.on('error', console.error);
