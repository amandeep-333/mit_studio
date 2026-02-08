import React from 'react';

const SavedDesigns = ({ savedDesigns }) => {
  if (savedDesigns.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Saved Designs ({savedDesigns.length})
      </h2>
      <div className="text-sm text-gray-600">
        You have {savedDesigns.length} saved design{savedDesigns.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default SavedDesigns;