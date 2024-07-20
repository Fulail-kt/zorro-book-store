import jwt from 'jsonwebtoken';


export const auth = (req, res, next) => {
  // Get token from the Authorization header
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Remove the 'Bearer ' prefix from the token
  const token = authHeader.split(' ')[1];

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ZORRO-SECRET');
    req.id = decoded.id;
    
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
