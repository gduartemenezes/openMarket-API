import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required().min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid data, try again' });
    }
    try {
      const { name, email } = await User.create(req.body);

      return res.json({
        name,
        email,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Request failed',
        error: err,
      });
    }
  }
}

export default new UserController();
