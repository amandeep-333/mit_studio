export const downloadDesignAsImage = (uploadedDesign, designPosition, designSize, rotation, selectedColor, tshirtColors) => {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');
  
  // Fill background with selected color
  ctx.fillStyle = tshirtColors.find(c => c.value === selectedColor)?.hex || '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  if (uploadedDesign) {
    const img = new Image();
    img.onload = () => {
      const designWidth = (canvas.width * designSize) / 100;
      const designHeight = (designWidth * img.height) / img.width;
      const x = (canvas.width * designPosition.x) / 100 - designWidth / 2;
      const y = (canvas.height * designPosition.y) / 100 - designHeight / 2;
      
      ctx.save();
      ctx.translate(x + designWidth / 2, y + designHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -designWidth / 2, -designHeight / 2, designWidth, designHeight);
      ctx.restore();
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `design-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
      });
    };
    img.src = uploadedDesign;
  }
};

export const clampValue = (value, min, max) => {
  return Math.max(min, Math.min(max, value));
};