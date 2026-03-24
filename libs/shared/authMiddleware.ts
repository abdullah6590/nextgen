import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin'
} as const;

type UserRole = typeof ROLES[keyof typeof ROLES];

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET environment variable is not set.");
  process.exit(1);
}
export interface AuthenticatedRequest extends Request {
  userId: number;
  user?: {
    userId: number;
    role: UserRole;
  };
}

/**
 * Express middleware that verifies JWT tokens from the Authorization header.
 * Attaches decoded user payload ({ userId, role }) to req.user.
 * Returns 401 if token is missing or invalid.
 */
export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: UserRole };

    // Validate role
    if (!Object.values(ROLES).includes(decoded.role)) {
      res.status(401).json({ error: 'Invalid token role' });
      return;
    }

    req.user = decoded;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

/**
 * Role-based access control middleware
 * @param allowedRoles - Array of allowed roles
 */
export function roleMiddleware(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'Forbidden',
        message: `Requires roles: ${allowedRoles.join(', ')}`
      });
      return;
    }

    next();
  };
}
