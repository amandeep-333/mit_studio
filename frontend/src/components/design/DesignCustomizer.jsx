// import React, { useState, useEffect } from 'react';
// import { Upload, RotateCw, ZoomIn, ZoomOut, Download, Save, Trash2, Loader, Maximize2, Move } from 'lucide-react';

// const API_BASE_URL = 'http://localhost:5000/api';

// async function uploadDesignFile(file) {
//   const formData = new FormData();
//   formData.append('designFile', file);
//   const response = await fetch(`${API_BASE_URL}/upload-design`, {
//     method: 'POST',
//     body: formData,
//   });
//   if (!response.ok) throw new Error('Upload failed');
//   return response.json();
// }

// async function saveDesign(designData) {
//   const response = await fetch(`${API_BASE_URL}/designs`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(designData),
//   });
//   if (!response.ok) throw new Error('Save failed');
//   return response.json();
// }

// async function getUserDesigns(userId) {
//   const response = await fetch(`${API_BASE_URL}/designs/${userId}`);
//   if (!response.ok) throw new Error('Fetch failed');
//   return response.json();
// }

// function DesignCustomizer() {
//   const [uploadedDesign, setUploadedDesign] = useState(null);
//   const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
//   const [designPosition, setDesignPosition] = useState({ x: 50, y: 40 });
//   const [designSize, setDesignSize] = useState(30);
//   const [rotation, setRotation] = useState(0);
//   const [selectedColor, setSelectedColor] = useState('white');
//   const [selectedProduct, setSelectedProduct] = useState('tshirt');
//   const [printType, setPrintType] = useState('regular');
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [savedDesigns, setSavedDesigns] = useState([]);
//   const [currentUserId] = useState('user_' + Math.random().toString(36).substr(2, 9));
//   const [notification, setNotification] = useState(null);

//   const tshirtColors = [
//     { name: 'White', value: 'white', hex: '#FFFFFF' },
//     { name: 'Black', value: 'black', hex: '#000000' },
//     { name: 'Navy', value: 'navy', hex: '#000080' },
//     { name: 'Red', value: 'red', hex: '#DC143C' },
//     { name: 'Green', value: 'green', hex: '#228B22' },
//   ];

//   const products = [
//     { name: 'T-Shirt', value: 'tshirt' },
//     { name: 'Hoodie', value: 'hoodie' },
//     { name: 'Tank Top', value: 'tank' },
//     { name: 'Jacket', value: 'jacket' },
//   ];

//   const printTypes = [
//     { name: 'Regular Print', value: 'regular', description: 'Print design on specific area' },
//     { name: 'All Over Print (AOP)', value: 'aop', description: 'Cover entire garment with design' },
//   ];

//   useEffect(() => {
//     loadUserDesigns();
//   }, []);

//   const loadUserDesigns = async () => {
//     try {
//       const response = await getUserDesigns(currentUserId);
//       setSavedDesigns(response.designs || []);
//     } catch (error) {
//       console.error('Error loading designs:', error);
//     }
//   };

//   const showNotification = (message, type = 'success') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith('image/')) {
//       setIsUploading(true);
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setUploadedDesign(event.target.result);
//       };
//       reader.readAsDataURL(file);
//       try {
//         const response = await uploadDesignFile(file);
//         setUploadedFileUrl(response.fileUrl);
//         showNotification('Design uploaded successfully!');
//       } catch (error) {
//         console.error('Upload error:', error);
//         showNotification('Error uploading design', 'error');
//       } finally {
//         setIsUploading(false);
//       }
//     }
//   };

//   const handleMouseDown = (e) => {
//     if (uploadedDesign) {
//       setIsDragging(true);
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const container = e.currentTarget.getBoundingClientRect();
//       const newX = ((e.clientX - container.left) / container.width) * 100;
//       const newY = ((e.clientY - container.top) / container.height) * 100;
//       setDesignPosition({
//         x: Math.max(10, Math.min(90, newX)),
//         y: Math.max(10, Math.min(90, newY))
//       });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleSizeChange = (delta) => {
//     setDesignSize(prev => Math.max(10, Math.min(80, prev + delta)));
//   };

//   const handleRotation = () => {
//     setRotation(prev => (prev + 90) % 360);
//   };

//   const resetDesign = () => {
//     setDesignPosition({ x: 50, y: 40 });
//     setDesignSize(30);
//     setRotation(0);
//   };

//   const handlePrintTypeChange = (type) => {
//     setPrintType(type);
//     if (type === 'aop') {
//       setDesignPosition({ x: 50, y: 50 });
//       setRotation(0);
//     }
//   };

//   const handleSaveToCart = async () => {
//     if (!uploadedDesign || !uploadedFileUrl) {
//       showNotification('Please upload a design first', 'error');
//       return;
//     }
//     setIsSaving(true);
//     try {
//       const designData = {
//         userId: currentUserId,
//         designImage: uploadedFileUrl,
//         printType: printType,
//         position: designPosition,
//         size: designSize,
//         rotation: rotation,
//         productType: selectedProduct,
//         color: selectedColor,
//         status: 'saved'
//       };
//       const response = await saveDesign(designData);
//       showNotification('Design saved successfully!');
//       await loadUserDesigns();
//       console.log('Design saved:', response);
//     } catch (error) {
//       console.error('Save error:', error);
//       showNotification('Error saving design', 'error');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const downloadDesign = () => {
//     const canvas = document.createElement('canvas');
//     canvas.width = 800;
//     canvas.height = 1000;
//     const ctx = canvas.getContext('2d');
//     ctx.fillStyle = tshirtColors.find(c => c.value === selectedColor)?.hex || '#FFFFFF';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     if (uploadedDesign) {
//       const img = new Image();
//       img.onload = () => {
//         const designWidth = (canvas.width * designSize) / 100;
//         const designHeight = (designWidth * img.height) / img.width;
//         const x = (canvas.width * designPosition.x) / 100 - designWidth / 2;
//         const y = (canvas.height * designPosition.y) / 100 - designHeight / 2;
//         ctx.save();
//         ctx.translate(x + designWidth / 2, y + designHeight / 2);
//         ctx.rotate((rotation * Math.PI) / 180);
//         ctx.drawImage(img, -designWidth / 2, -designHeight / 2, designWidth, designHeight);
//         ctx.restore();
//         canvas.toBlob((blob) => {
//           const url = URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `design-${Date.now()}.png`;
//           a.click();
//           URL.revokeObjectURL(url);
//         });
//       };
//       img.src = uploadedDesign;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {notification && (
//         <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
//           notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
//         }`}>
//           {notification.message}
//         </div>
//       )}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-3xl font-bold text-gray-900">Custom Design Studio</h1>
//             <div className="text-sm text-gray-600">House of Mit</div>
//           </div>
//         </div>
//       </header>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-1 space-y-6">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Your Design</h2>
//               <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   {isUploading ? (
//                     <>
//                       <Loader className="w-10 h-10 mb-3 text-blue-500 animate-spin" />
//                       <p className="text-sm text-gray-500">Uploading...</p>
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="w-10 h-10 mb-3 text-gray-400" />
//                       <p className="mb-2 text-sm text-gray-500">
//                         <span className="font-semibold">Click to upload</span> or drag and drop
//                       </p>
//                       <p className="text-xs text-gray-500">PNG, JPG, SVG (MAX. 5MB)</p>
//                     </>
//                   )}
//                 </div>
//                 <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
//               </label>
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-xl font-semibold mb-4 text-gray-800">Print Type</h2>
//               <div className="space-y-3">
//                 {printTypes.map((type) => (
//                   <button
//                     key={type.value}
//                     onClick={() => handlePrintTypeChange(type.value)}
//                     className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
//                       printType === type.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
//                     }`}>
//                     <div className="flex items-start gap-3">
//                       {type.value === 'regular' ? (
//                         <Move className={`w-5 h-5 mt-0.5 ${printType === type.value ? 'text-blue-600' : 'text-gray-400'}`} />
//                       ) : (
//                         <Maximize2 className={`w-5 h-5 mt-0.5 ${printType === type.value ? 'text-blue-600' : 'text-gray-400'}`} />
//                       )}
//                       <div className="flex-1">
//                         <div className={`font-semibold ${printType === type.value ? 'text-blue-600' : 'text-gray-900'}`}>{type.name}</div>
//                         <div className="text-xs text-gray-500 mt-1">{type.description}</div>
//                       </div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//               {printType === 'aop' && (
//                 <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
//                   <p className="text-xs text-amber-800">
//                     <span className="font-semibold">Note:</span> AOP designs will cover the entire garment. High-resolution images recommended (min 3000x3000px).
//                   </p>
//                 </div>
//               )}
//             </div>
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Product</h2>
//               <div className="grid grid-cols-2 gap-2">
//                 {products.map((product) => (
//                   <button
//                     key={product.value}
//                     onClick={() => setSelectedProduct(product.value)}
//                     className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
//                       selectedProduct === product.value ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                     }`}>
//                     {product.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             {printType === 'regular' && (
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-800">Choose Color</h2>
//                 <div className="flex gap-3 flex-wrap">
//                   {tshirtColors.map((color) => (
//                     <button
//                       key={color.value}
//                       onClick={() => setSelectedColor(color.value)}
//                       className={`w-12 h-12 rounded-full border-4 transition-all ${
//                         selectedColor === color.value ? 'border-blue-600 scale-110' : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                       style={{ backgroundColor: color.hex }}
//                       title={color.name}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}
//             {uploadedDesign && (
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-800">
//                   {printType === 'aop' ? 'Pattern Settings' : 'Adjust Design'}
//                 </h2>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       {printType === 'aop' ? 'Pattern Scale' : 'Size'}: {designSize}%
//                     </label>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleSizeChange(-5)}
//                         className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
//                         <ZoomOut className="w-4 h-4" />
//                         Smaller
//                       </button>
//                       <button
//                         onClick={() => handleSizeChange(5)}
//                         className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
//                         <ZoomIn className="w-4 h-4" />
//                         Larger
//                       </button>
//                     </div>
//                   </div>
//                   <button
//                     onClick={handleRotation}
//                     className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
//                     <RotateCw className="w-4 h-4" />
//                     Rotate 90°
//                   </button>
//                   <button
//                     onClick={resetDesign}
//                     className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
//                     <Trash2 className="w-4 h-4" />
//                     Reset Position
//                   </button>
//                   {printType === 'aop' && (
//                     <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                       <p className="text-xs text-blue-800">
//                         Your pattern will repeat across the entire {selectedProduct}. Adjust scale and position for the perfect look!
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//             {uploadedDesign && (
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <div className="space-y-3">
//                   <button
//                     onClick={handleSaveToCart}
//                     disabled={isSaving}
//                     className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
//                     {isSaving ? (
//                       <>
//                         <Loader className="w-5 h-5 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-5 h-5" />
//                         Save & Add to Cart
//                       </>
//                     )}
//                   </button>
//                   <button
//                     onClick={downloadDesign}
//                     className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
//                     <Download className="w-5 h-5" />
//                     Download Design
//                   </button>
//                 </div>
//               </div>
//             )}
//             {savedDesigns.length > 0 && (
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-semibold mb-4 text-gray-800">
//                   Saved Designs ({savedDesigns.length})
//                 </h2>
//                 <div className="text-sm text-gray-600">
//                   You have {savedDesigns.length} saved design{savedDesigns.length !== 1 ? 's' : ''}
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-md p-8 sticky top-8">
//               <h2 className="text-2xl font-semibold mb-6 text-gray-800">Live Preview</h2>
//               <div
//                 className="relative aspect-square max-w-2xl mx-auto overflow-hidden rounded-lg"
//                 onMouseMove={handleMouseMove}
//                 onMouseUp={handleMouseUp}
//                 onMouseLeave={handleMouseUp}>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <svg viewBox="0 0 400 500" className="w-full h-full">
//                     <defs>
//                       {printType === 'aop' && uploadedDesign && (
//                         <pattern 
//                           id="aopPattern" 
//                           x={designPosition.x} 
//                           y={designPosition.y} 
//                           width={400 * (designSize / 100)} 
//                           height={500 * (designSize / 100)} 
//                           patternUnits="userSpaceOnUse">
//                           <image 
//                             href={uploadedDesign} 
//                             x="0" 
//                             y="0" 
//                             width={400 * (designSize / 100)}
//                             height={500 * (designSize / 100)}
//                             preserveAspectRatio="xMidYMid slice"
//                             transform={`rotate(${rotation} ${200 * (designSize / 100)} ${250 * (designSize / 100)})`}
//                           />
//                         </pattern>
//                       )}
//                     </defs>
//                     <path
//                       d="M100 100 L80 120 L80 500 L320 500 L320 120 L300 100 L280 80 L270 70 L250 70 L240 80 L230 80 L220 90 L180 90 L170 80 L160 80 L150 70 L130 70 L120 80 Z"
//                       fill={printType === 'aop' ? 'url(#aopPattern)' : tshirtColors.find(c => c.value === selectedColor)?.hex || '#FFFFFF'}
//                       stroke="#E5E7EB"
//                       strokeWidth="2"
//                     />
//                     <path
//                       d="M180 90 Q200 120 220 90"
//                       fill="none"
//                       stroke="#E5E7EB"
//                       strokeWidth="2"
//                     />
//                     {printType === 'regular' && (
//                       <>
//                         <path d="M100 100 L80 120 L80 200" fill="rgba(0,0,0,0.05)" />
//                         <path d="M300 100 L320 120 L320 200" fill="rgba(0,0,0,0.05)" />
//                       </>
//                     )}
//                   </svg>
//                 </div>
//                 {uploadedDesign && printType === 'regular' && (
//                   <div
//                     className="absolute cursor-move"
//                     style={{
//                       left: `${designPosition.x}%`,
//                       top: `${designPosition.y}%`,
//                       transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
//                       width: `${designSize}%`,
//                       maxWidth: '300px',
//                     }}
//                     onMouseDown={handleMouseDown}>
//                     <img
//                       src={uploadedDesign}
//                       alt="Custom Design"
//                       className="w-full h-auto pointer-events-none select-none"
//                       draggable="false"
//                       style={{
//                         filter: selectedColor === 'black' ? 'brightness(1.2) contrast(1.1)' : 'none'
//                       }}
//                     />
//                   </div>
//                 )}
//                 {uploadedDesign && printType === 'aop' && (
//                   <div
//                     className="absolute cursor-move border-2 border-dashed border-blue-500 bg-blue-500 bg-opacity-10"
//                     style={{
//                       left: `${designPosition.x}%`,
//                       top: `${designPosition.y}%`,
//                       transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
//                       width: `${designSize}%`,
//                       height: `${designSize}%`,
//                       maxWidth: '400px',
//                       maxHeight: '500px',
//                       pointerEvents: 'auto'
//                     }}
//                     onMouseDown={handleMouseDown}>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
//                         Drag to adjust pattern origin
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 {!uploadedDesign && (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="text-center text-gray-400">
//                       <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
//                       <p className="text-lg font-medium">Upload a design to get started</p>
//                       <p className="text-sm mt-2">Your design will appear on the {selectedProduct}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               {uploadedDesign && (
//                 <div className="mt-6 text-center text-sm text-gray-600">
//                   <p className="font-medium">💡 Pro Tip:</p>
//                   {printType === 'regular' ? (
//                     <p>Click and drag your design to reposition it on the {selectedProduct}</p>
//                   ) : (
//                     <p>Drag to adjust pattern origin and use size controls to scale. Pattern repeats across entire {selectedProduct}!</p>
//                   )}
//                 </div>
//               )}
//               <div className="mt-4 flex justify-center">
//                 <span className={`px-4 py-2 rounded-full text-sm font-medium ${
//                   printType === 'aop' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
//                 }`}>
//                   {printType === 'aop' ? '🎨 All Over Print' : '📍 Regular Print'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DesignCustomizer;




import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { fetchUserDesigns } from '../../store/design.slice';
import UploadBox from '../UploadBox';
import DesignControls from './DesignControls';
import DesignCanvas from './DesignCanvas';
import SavedDesigns from './SavedDesigns';

const DesignCustomizer = () => {
  const dispatch = useDispatch();
  const designs = useSelector((state) => state.design.savedDesigns);

  const userId = React.useMemo(
    () => 'user_' + Math.random().toString(36).slice(2),
    []
  );

  useEffect(() => {
    dispatch(fetchUserDesigns(userId));
  }, [dispatch, userId]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Design Customizer</h1>

      <UploadBox />
      <DesignControls />
      <DesignCanvas />
      <SavedDesigns designs={designs} />
    </div>
  );
};

export default DesignCustomizer;
           