import bcryptjs from 'bcrypt';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );


    const { password, ...rest } = updatedUser._doc;
    console.log(rest);
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async(req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    console.log(deleteUser);
    if (!deletedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

