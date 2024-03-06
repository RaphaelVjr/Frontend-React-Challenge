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

      const sqlStatements = data.map(movie => {
        const { title, director, created_at, updated_at, average_score } = movie;
        return `INSERT INTO "movies" ("title", "director", "created_at", "updated_at", "average_score") VALUES ('${title}', '${director}', '${created_at}', '${updated_at}', ${average_score}) RETURNING "id"`;
      });

      const sqlResponse = await fetch('http://127.0.0.1:3000/execute_sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sqlStatements }),
      });
      if (!sqlResponse.ok) {
        throw new Error('SQL Response not ok');
      } 
      const sqlData = await sqlResponse.json();
      console.log(sqlData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form method="post" encType="multipart/form-data" onSubmit={submitFile}>
      <input type="file" onChange={handleFileUpload} />
      <button type="submit">Submit</button>
    </form> 
  );
} 

export default FileUpload;