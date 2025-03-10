import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase';
import User from '../models/User';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        firebaseUid: string;
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];
    
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseUid = decodedToken.uid;
    
    // Find or create user in our database
    let user = await User.findOne({ where: { firebaseUid } });
    
    if (!user && decodedToken.email) {
      // Auto-create user in our database if they don't exist
      user = await User.create({
        email: decodedToken.email,
        username: decodedToken.email.split('@')[0], // Simple username from email
        firebaseUid,
        // No need to store password as Firebase handles authentication
        password: '' // You might want to modify your User model to make password optional
      });
    }
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Add user info to request
    req.user = {
      id: user.id,
      email: user.email,
      firebaseUid
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
};