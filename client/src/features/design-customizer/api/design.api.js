// IMPORTANT:
// Do NOT use "@/..." unless you are 100% sure Vite alias is configured.
// This relative path WILL work with your structure.

import api from "../../../services/axios";

/**
 * Upload design file (image)
 * Backend should return:
 * { imageUrl: string, publicId?: string }
 */
export const uploadDesignFile = (file) => {
  const formData = new FormData();
  formData.append("designFile", file);

  return api.post("/upload-design", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Save design metadata
 */
export const saveDesign = (designData) => {
  return api.post("/designs", designData);
};

/**
 * Get all designs for a user
 */
export const getUserDesigns = (userId) => {
  return api.get(`/designs/${userId}`);
};

/**
 * Get single design
 */
export const getDesignById = (designId) => {
  return api.get(`/design/${designId}`);  
};
  
/**
 * Update design
 */
export const updateDesign = (designId, updateData) => {
  return api.put(`/designs/${designId}`, updateData);
};

/**
 * Delete design
 */
export const deleteDesign = (designId) => {
  return api.delete(`/designs/${designId}`);
};
