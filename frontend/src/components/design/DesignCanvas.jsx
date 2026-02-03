import React from 'react';
import { useSelector } from 'react-redux';

const DesignCanvas = () => {
  const { uploadedDesign, size, rotation } = useSelector(
    (state) => state.design
  );

  if (!uploadedDesign) return <p>No design uploaded</p>;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Preview</h3>
      <img
        src={uploadedDesign}
        alt="design"
        style={{
          width: `${size * 5}px`,
          transform: `rotate(${rotation}deg)`,
        }}
      />
    </div>
  );
};

export default DesignCanvas;
   