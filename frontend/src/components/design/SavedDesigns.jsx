import React from 'react';

const SavedDesigns = ({ designs }) => {
  if (!designs?.length) return <p>No saved designs</p>;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Saved Designs</h3>
      <ul>
        {designs.map((d) => (
          <li key={d.id}>{d.designImage}</li>
        ))}
      </ul>
    </div>
  );
};

export default SavedDesigns;
