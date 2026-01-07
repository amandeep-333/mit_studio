// server.js - Express Backend Server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/houseofmit_designs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Design Schema
const designSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  designImage: {
    type: String,
    required: true
  },
  printType: {
    type: String,
    enum: ['regular', 'aop'],
    default: 'regular'
  },
  position: {
    x: { type: Number, default: 50 },
    y: { type: Number, default: 40 }
  },
  size: {
    type: Number,
    default: 30
  },
  rotation: {
    type: Number,
    default: 0
  },
  productType: {
    type: String,
    enum: ['tshirt', 'hoodie', 'tank', 'jacket'],
    default: 'tshirt'
  },
  color: {
    type: String,
    default: 'white'
  },
  status: {
    type: String,
    enum: ['draft', 'saved', 'ordered'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Design = mongoose.model('Design', designSchema);

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'design-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Upload design image
app.post('/api/upload-design', upload.single('designFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.json({
      success: true,
      message: 'File uploaded successfully',
      fileUrl: fileUrl,
      fileName: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Error uploading file', details: error.message });
  }
});

// Save design
app.post('/api/designs', async (req, res) => {
  try {
    const { userId, designImage, position, size, rotation, productType, color, printType } = req.body;

    if (!userId || !designImage) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newDesign = new Design({
      userId,
      designImage,
      printType: printType || 'regular',
      position,
      size,
      rotation,
      productType,
      color,
      status: 'saved'
    });

    const savedDesign = await newDesign.save();
    
    res.status(201).json({
      success: true,
      message: 'Design saved successfully',
      design: savedDesign
    });
  } catch (error) {
    console.error('Save design error:', error);
    res.status(500).json({ error: 'Error saving design', details: error.message });
  }
});

// Get all designs for a user
app.get('/api/designs/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const designs = await Design.find({ userId }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: designs.length,
      designs: designs
    });
  } catch (error) {
    console.error('Get designs error:', error);
    res.status(500).json({ error: 'Error fetching designs', details: error.message });
  }
});

// Get single design by ID
app.get('/api/design/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const design = await Design.findById(id);
    
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    
    res.json({
      success: true,
      design: design
    });
  } catch (error) {
    console.error('Get design error:', error);
    res.status(500).json({ error: 'Error fetching design', details: error.message });
  }
});

// Update design
app.put('/api/designs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { position, size, rotation, productType, color, status, printType } = req.body;

    const updatedDesign = await Design.findByIdAndUpdate(
      id,
      {
        position,
        size,
        rotation,
        productType,
        color,
        status,
        printType,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!updatedDesign) {
      return res.status(404).json({ error: 'Design not found' });
    }

    res.json({
      success: true,
      message: 'Design updated successfully',
      design: updatedDesign
    });
  } catch (error) {
    console.error('Update design error:', error);
    res.status(500).json({ error: 'Error updating design', details: error.message });
  }
});

// Delete design
app.delete('/api/designs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const design = await Design.findById(id);

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    if (design.designImage && design.designImage.includes('/uploads/')) {
      const fileName = design.designImage.split('/uploads/')[1];
      const filePath = path.join(__dirname, 'uploads', fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Design.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Design deleted successfully'
    });
  } catch (error) {
    console.error('Delete design error:', error);
    res.status(500).json({ error: 'Error deleting design', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    details: err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
