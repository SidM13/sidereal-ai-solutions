import express from 'express';
import Resource from '../models/Resource.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const resources = await Resource.find(filter).populate('author', 'firstName lastName email');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, category, url } = req.body;
    
    const resource = new Resource({
      title,
      description,
      category,
      url,
      author: req.userId
    });

    await resource.save();
    await resource.populate('author', 'firstName lastName email');

    res.status(201).json({
      message: 'Resource created successfully',
      resource
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/upvote', verifyToken, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    res.json({
      message: 'Resource upvoted',
      resource
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
