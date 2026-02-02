const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const prisma = require('./prismaClient');

const app = express();

/* ======================
   Middleware
====================== */
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

/* ======================
   Multer
====================== */
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `design-${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|svg/;
    if (allowed.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files allowed'));
  },
});

/* ======================
   Routes
====================== */

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' });
});

/* ---------- Upload ---------- */
app.post('/api/upload-design', upload.single('designFile'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.json({
    success: true,
    fileUrl,
    fileName: req.file.filename,
  });
});

/* ---------- Create Design ---------- */
app.post('/api/designs', async (req, res) => {
  const {
    userId,
    designImage,
    position = {},
    size,
    rotation,
    productType,
    color,
    printType,
  } = req.body;

  if (!userId || !designImage) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const design = await prisma.design.create({
    data: {
      userId,
      designImage,
      printType: printType || 'regular',
      positionX: position.x ?? 50,
      positionY: position.y ?? 40,
      size: size ?? 30,
      rotation: rotation ?? 0,
      productType: productType || 'tshirt',
      color: color || 'white',
      status: 'saved',
    },
  });

  res.status(201).json({ success: true, design });
});

/* ---------- Get User Designs ---------- */
app.get('/api/designs/:userId', async (req, res) => {
  const designs = await prisma.design.findMany({
    where: { userId: req.params.userId },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ success: true, designs });
});

/* ---------- Get Single Design ---------- */
app.get('/api/design/:id', async (req, res) => {
  const design = await prisma.design.findUnique({
    where: { id: req.params.id },
  });

  if (!design) return res.status(404).json({ error: 'Design not found' });

  res.json({ success: true, design });
});

/* ---------- Update Design ---------- */
app.put('/api/designs/:id', async (req, res) => {
  const {
    position = {},
    size,
    rotation,
    productType,
    color,
    status,
    printType,
  } = req.body;

  const design = await prisma.design.update({
    where: { id: req.params.id },
    data: {
      positionX: position.x,
      positionY: position.y,
      size,
      rotation,
      productType,
      color,
      status,
      printType,
    },
  });

  res.json({ success: true, design });
});

/* ---------- Delete Design ---------- */
app.delete('/api/designs/:id', async (req, res) => {
  const design = await prisma.design.findUnique({
    where: { id: req.params.id },
  });

  if (!design) return res.status(404).json({ error: 'Design not found' });

  const fileName = design.designImage.split('/uploads/')[1];
  if (fileName) {
    const filePath = path.join(__dirname, 'uploads', fileName);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  await prisma.design.delete({
    where: { id: req.params.id },
  });

  res.json({ success: true });
});

/* ====================== */

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
