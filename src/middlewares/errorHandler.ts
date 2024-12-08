import { Request, Response, NextFunction } from 'express';

/**
 * Global Error Handler Middleware
 *
 * @param err - Error object
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Next Function
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {    
    console.error(err.stack || err.message || err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        details: err.details || null,
    });
};
