import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, z } from 'zod';

/**
 * Generic validation middleware using Zod.
 * Validates the req.body against the provided schema.
 */
export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          issues: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        });
      }
      next(error);
    }
  };
};

// ==========================================
// SCHEMAS
// ==========================================

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  role: z.enum(['customer', 'vendor', 'admin']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().positive('Price must be a positive number'),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  category: z.string().optional(),
  images: z.array(z.string().url('Image must be a valid URL')).optional(),
  tags: z.array(z.string()).optional(),
  featureVector: z.array(z.number()).optional(),
});

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().min(1, 'Product ID is required'),
      quantity: z.number().int().positive('Quantity must be a positive integer'),
      price: z.number().positive('Price must be a positive number'),
    })
  ).min(1, 'Order must contain at least one item'),
});
