import User from '../models/User';

class UserController {
  async store(req, res) {
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
