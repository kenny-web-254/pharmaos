import jwt from 'jsonwebtoken';

export const generateToken = (id, organizationId) => {
  return jwt.sign(
    { id, organizationId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const decodeToken = (token) => {
  return jwt.decode(token);
};
