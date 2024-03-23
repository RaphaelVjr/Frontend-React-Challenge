import React, { useState } from 'react';
import Papa from 'papaparse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';


const validateFile = (file) => {
  if (!file) {
    return "Confirm it is a CSV or JSON file.";
  }

  if (file.size > 10485760) {
    return "File size exceeds 10 MB.";
  }

  if (file.type !== 'text/csv' && file.type !== 'application/json') {
    return "File not supported, need to be a CSV or JSON Valid file.";
  }

  return null;
};

function FileUpload({ topMovies, getMoviesFromDatabase, setTopMovies, setFilteredData }) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);

  const movieExistsInGrid = (title) => {
    return topMovies.some(movie => movie.title === title);
  };

  const submitFile = async (event) => {
    event.preventDefault();


    const validationError = validateFile(file);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Read the file and convert it to an array of movies
      const reader = new FileReader();
      reader.onload = async (evt) => {
        let movies;
        if (file.type === 'text/csv') {
          try {
            movies = parseCsv(evt.target.result);
          } catch (error) {
            toast.error('Invalid CSV file');
          }
        } else if (file.type === 'application/json') {
          try {
            movies = JSON.parse(evt.target.result);
          } catch (error) {
            toast.error('Invalid JSON file');
          }
        }

        if (!movies || movies.length === 0) {
          toast.error('File is empty or invalid');
        }

        const newMovies = movies.filter(movie => !movieExistsInGrid(movie.title));


        if (newMovies.length === 0) {
          toast.info('No new movies to import');
          return;
        }

        // Convert the array of new movies back to CSV or JSON
        let newFileContent;
        if (file.type === 'text/csv') {
          newFileContent = convertToCsv(newMovies);
        } else if (file.type === 'application/json') {
          newFileContent = JSON.stringify(newMovies);
        }


        const newFile = new Blob([newFileContent], { type: file.type });


        const formData = new FormData();
        formData.append('file', newFile, file.name);


        const response = await fetch('http://127.0.0.1:3000/import_movies', {
          method: 'POST',
          body: formData,
        });


        if (response.ok) {
          toast.success("Movies imported successfully");
          const movies = await getMoviesFromDatabase();
          setTopMovies(movies);
          setFilteredData(movies);
        } else {
          throw new Error('Error importing movies');
        }
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage("An error occurred while uploading the file.");
      toast.error("An error occurred while importing movies");
    } finally {
      setIsSubmitting(false);
      setFile(null);
    }
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    setErrorMessage("");
    submitFile(event);
  };

  const parseCsv = (csv) => {
    const result = Papa.parse(csv, {
      header: true,
      dynamicTyping: true,
    });

    if (result.errors.length > 0) {
      throw new Error('Error parsing CSV: ' + result.errors[0].message);
    }

    return result.data;
  }

  const convertToCsv = (data) => {
    return Papa.unparse(data);
  };

  return (
    <form className='input-file' method="post" encType="multipart/form-data" onSubmit={submitFile}>
      <input type="file" onChange={handleFileUpload} disabled={isSubmitting} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit" disabled={!file || isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default FileUpload;