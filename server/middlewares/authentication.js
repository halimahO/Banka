import { verifyToken } from '../helpers/auth';

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'undefined') {
    res.status(403).json({
      status: 403,
      message: 'Authorization token required',
    });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(403).json({
      status: 403,
      message: 'Authorization fail! Invalid token',
    });
  }
};

export const adminAuth = (req, res, next) => {
  const { isAdmin, type } = req.user;
  if (isAdmin !== true && type !== 'staff') {
    res.status(403).json({
      status: 403,
      message: 'Unauthorized! Accessible to admin only',
    });
  }
  return next();
};

export const staffAuth = (req, res, next) => {
  const { type } = req.user;
  if (type !== 'staff') {
    res.status(403).json({
      status: 403,
      message: 'Unauthorized! Accessible to staff only',
    });
  }
  return next();
};
