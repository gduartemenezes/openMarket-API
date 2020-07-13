import Product from '../models/Product';
import User from '../models/User';

class ProductController {
  async store(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user || user.seller === false) {
        return res.status(401).json({
          error:
            'You have no authorization to create a product, enable it in update user session',
        });
      }
      const { name, value, quantity } = req.body;
      const seller_id = user.id;
      const product = await Product.create({
        seller_id,
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
