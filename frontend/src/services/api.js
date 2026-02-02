const API_BASE_URL = "http://localhost:5000/api";

async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "API request failed");
    }
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function uploadDesignFile(file) {
  const formData = new FormData();
  formData.append("designFile", file);
  try {
    const response = await fetch(`${API_BASE_URL}/upload-design`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Upload failed");
    }
    return data;
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
}

export async function saveDesign(designData) {
  return fetchAPI("/designs", {
    method: "POST",
    body: JSON.stringify(designData),
  });
}

export async function getUserDesigns(userId) {
  return fetchAPI(`/designs/${userId}`);
}

export async function getDesignById(designId) {
  return fetchAPI(`/design/${designId}`);
}

export async function updateDesign(designId, updateData) {
  return fetchAPI(`/designs/${designId}`, {
    method: "PUT",
    body: JSON.stringify(updateData),
  });
}

export async function deleteDesign(designId) {
  return fetchAPI(`/designs/${designId}`, {
    method: "DELETE",
  });
}
