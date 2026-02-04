import { useState, useEffect, useCallback } from 'react';
import { saveDesign, getUserDesigns } from '../services/api';
import { 
  DEFAULT_DESIGN_STATE, 
  AOP_DESIGN_STATE,
  SIZE_CONSTRAINTS,
  POSITION_CONSTRAINTS 
} from '../constants/designConfig';
import { clampValue } from '../utils/canvasUtils';

export const useDesignCustomizer = (userId, onSuccess, onError) => {
  const [designPosition, setDesignPosition] = useState(DEFAULT_DESIGN_STATE.position);
  const [designSize, setDesignSize] = useState(DEFAULT_DESIGN_STATE.size);
  const [rotation, setRotation] = useState(DEFAULT_DESIGN_STATE.rotation);
  const [selectedColor, setSelectedColor] = useState('white');
  const [selectedProduct, setSelectedProduct] = useState('tshirt');
  const [printType, setPrintType] = useState('regular');
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedDesigns, setSavedDesigns] = useState([]);

  // Load user designs on mount
  useEffect(() => {
    loadUserDesigns();
  }, [userId]);

  const loadUserDesigns = async () => {
    try {
      const response = await getUserDesigns(userId);
      setSavedDesigns(response.designs || []);
    } catch (error) {
      console.error('Error loading designs:', error);
    }
  };

  const handlePrintTypeChange = useCallback((type) => {
    setPrintType(type);
    if (type === 'aop') {
      setDesignPosition(AOP_DESIGN_STATE.position);
      setRotation(AOP_DESIGN_STATE.rotation);
    }
  }, []);

  const handleSizeChange = useCallback((delta) => {
    setDesignSize(prev => 
      clampValue(prev + delta, SIZE_CONSTRAINTS.min, SIZE_CONSTRAINTS.max)
    );
  }, []);

  const handleRotation = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  const resetDesign = useCallback(() => {
    setDesignPosition(DEFAULT_DESIGN_STATE.position);
    setDesignSize(DEFAULT_DESIGN_STATE.size);
    setRotation(DEFAULT_DESIGN_STATE.rotation);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const container = e.currentTarget.getBoundingClientRect();
    const newX = ((e.clientX - container.left) / container.width) * 100;
    const newY = ((e.clientY - container.top) / container.height) * 100;
    
    setDesignPosition({
      x: clampValue(newX, POSITION_CONSTRAINTS.min, POSITION_CONSTRAINTS.max),
      y: clampValue(newY, POSITION_CONSTRAINTS.min, POSITION_CONSTRAINTS.max)
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleSaveDesign = async (uploadedFileUrl) => {
    if (!uploadedFileUrl) {
      onError?.('Please upload a design first');
      return;
    }

    setIsSaving(true);
    try {
      const designData = {
        userId,
        designImage: uploadedFileUrl,
        printType,
        position: designPosition,
        size: designSize,
        rotation,
        productType: selectedProduct,
        color: selectedColor,
        status: 'saved'
      };
      
      const response = await saveDesign(designData);
      onSuccess?.('Design saved successfully!');
      await loadUserDesigns();
      console.log('Design saved:', response);
    } catch (error) {
      console.error('Save error:', error);
      onError?.('Error saving design');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    designPosition,
    designSize,
    rotation,
    selectedColor,
    selectedProduct,
    printType,
    isDragging,
    isSaving,
    savedDesigns,
    setSelectedColor,
    setSelectedProduct,
    handlePrintTypeChange,
    handleSizeChange,
    handleRotation,
    resetDesign,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleSaveDesign,
  };
};