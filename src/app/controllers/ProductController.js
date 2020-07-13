import Product from '../models/Product';
import User from '../models/User';

class ProductController {
  async store(req, res) {
    const user = await User.findByPK(req.userID);
    if (user.seller === false) {
      return res.status(401).json({
        error:
          'You have no authorization to create a product, enable it in update user session',
      });
    }
    try {
      const { name, value, quantity } = req.body;
      const product = await Product.create({
        seller_id: req.userId,
        name,
        value,
        quantity,
      });

      return res.json(product);
    } catch (err) {
      return res.status(400).json({
        message: 'Request Failed',
        error: err,
      });
    }
  }
}

export default new ProductController();
