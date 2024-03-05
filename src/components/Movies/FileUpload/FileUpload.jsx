import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);

  const submitFile = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('http://127.0.0.1:3000/import_movies', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Response not ok');
      }
      const data = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={submitFile}>
      <input type="file" onChange={handleFileUpload} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FileUpload;