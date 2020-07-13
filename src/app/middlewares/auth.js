import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Return error if client does not have a bearer token
  if (!authHeader) {
    return res.status(401).json({
      error: 'You have no authorization to access this page',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    // Compare application secret with the one taken from the bearer token
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // Create a property to validate user's authrotization in private pages
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: 'Request Failed',
      error: err,
    });
  }
};
