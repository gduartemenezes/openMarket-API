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
        where: email,
      });
      if (userExists) {
        return res.status(400).json({
          message: 'E-mail alredy in use',
        });
      }
      // Create user and return a json with the new user info
      const { id, name } = await User.create(req.body);

      return res.json({
        id,
        name,
        email,
      });
    } catch (err) {
      // Return any request errors produced
      return res.status(400).json({
        message: 'Request failed',
        error: err,
      });
    }
  }
}

export default new UserController();
