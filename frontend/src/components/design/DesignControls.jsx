import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSize,
  setRotation,
  resetDesign,
} from '../../store/design.slice';

const DesignControls = () => {
  const dispatch = useDispatch();
  const size = useSelector((s) => s.design.size);
  const rotation = useSelector((s) => s.design.rotation);

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Controls</h3>

      <button onClick={() => dispatch(setSize(size + 5))}>Zoom +</button>
      <button onClick={() => dispatch(setSize(size - 5))}>Zoom -</button>

      <button onClick={() => dispatch(setRotation(rotation + 90))}>
        Rotate
      </button>

      <button onClick={() => dispatch(resetDesign())}>Reset</button>
    </div>
  );
};

export default DesignControls;
