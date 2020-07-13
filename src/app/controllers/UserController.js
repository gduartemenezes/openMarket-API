import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // create yup schema
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required().min(6),
    });
    // Validate req.body
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data, try again' });
    }
    try {
      const { email } = req.body;
      // Check if email is alreay in use
      const userExists = await User.findOne({
        where: { email },
      });
      if (userExists) {
        return res.status(400).json({
          message: 'E-mail already in use',
        });
      }
      // Create user and return a json with the new user info
      const { id, name, seller } = await User.create(req.body);

      return res.json({
        id,
        name,
        email,
        seller,
      });
    } catch (err) {
      // Return any request errors produced
      return res.status(400).json({
        message: 'Request failed',
        error: err,
      });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      oldPassword: Yup.string().required().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required() : field
      ),
    });
    // Validate req.body
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data, try again' });
    }
    // TO-DO, after auth middleware
    try {
      const { email, oldPassword } = req.body;

      const user = await User.findByPk(req.userId);

      if (email !== user.email) {
        const userExists = User.findOne({ where: { email } });

        if (userExists)
          return res.status(401).json({ error: 'E-mail already in use' });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res
          .status(401)
          .json({ error: 'Request Failed, currently password does not match' });
      }

      const { id, name, seller } = await user.update(req.body);

      return res.json({
        id,
        name,
        email,
        seller,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Request Failed',
        error: err,
      });
    }
  }
}

export default new UserController();
