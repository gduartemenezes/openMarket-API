import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      // Search for a user with the email passed
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({
          error: 'E-mail not registered',
        });
      }
      if (!(await user.checkPassword(password))) {
        return res.status(400).json({
          error: 'Password does not match!',
        });
      }

      const { id, name } = user;

      return res.json({
        user: { id, name },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Request Failed',
        error: err,
      });
    }
  }
}

export default new SessionController();
