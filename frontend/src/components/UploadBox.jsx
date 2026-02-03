import React from 'react';
import { useDispatch } from 'react-redux';

import { setUploadedPreview,uploadDesign } from '../store/design.slice';

const UploadBox = () => {
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // local preview
    const reader = new FileReader();
    reader.onload = () => {
      dispatch(setUploadedPreview(reader.result));
    };
    reader.readAsDataURL(file);

    // upload to backend
    dispatch(uploadDesign(file));
  };

  return (
    <div>
      <h3>Upload Design</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default UploadBox;
