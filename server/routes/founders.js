import express from 'express';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const founders = await User.find().select('-password');
    res.json(founders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const founder = await User.findById(req.params.id).select('-password');
    if (!founder) {
      return res.status(404).json({ message: 'Founder not found' });
    }
    res.json(founder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    if (req.userId !== req.params.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { firstName, lastName, profile } = req.body;
    const founder = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, profile },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      founder
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
