export const TSHIRT_COLORS = [
  { name: 'White', value: 'white', hex: '#FFFFFF' },
  { name: 'Black', value: 'black', hex: '#000000' },
  { name: 'Navy', value: 'navy', hex: '#000080' },
  { name: 'Red', value: 'red', hex: '#DC143C' },
  { name: 'Green', value: 'green', hex: '#228B22' },
];

export const PRODUCTS = [
  { name: 'T-Shirt', value: 'tshirt' },
  { name: 'Hoodie', value: 'hoodie' },
  { name: 'Tank Top', value: 'tank' },
  { name: 'Jacket', value: 'jacket' },
];

export const PRINT_TYPES = [
  { 
    name: 'Regular Print', 
    value: 'regular', 
    description: 'Print design on specific area' 
  },
  { 
    name: 'All Over Print (AOP)', 
    value: 'aop', 
    description: 'Cover entire garment with design' 
  },
];

export const DEFAULT_DESIGN_STATE = {
  position: { x: 50, y: 40 },
  size: 30,
  rotation: 0,
};

export const AOP_DESIGN_STATE = {
  position: { x: 50, y: 50 },
  size: 30,
  rotation: 0,
};

export const SIZE_CONSTRAINTS = {
  min: 10,
  max: 80,
  step: 5,
};

export const POSITION_CONSTRAINTS = {
  min: 10,
  max: 90,
};

export const NOTIFICATION_DURATION = 3000;

export const FILE_UPLOAD_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'],
  acceptedExtensions: 'image/*',
};