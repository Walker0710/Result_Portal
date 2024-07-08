import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5000";

const Result = () => {

  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/result`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      setResult(response.data);
    };

    fetchResult();
  }, []);

  if(!result) return <div>Loading...</div>;

  return (
    <div>
      <h1>Result</h1>
      <p>Student Name: {result.studentName}</p>
      <p>School Name: {result.schoolName}</p>
      <p>Marks Obtained: {result.marksObtained}</p>
      <p>Qualified for Second Round: {result.qualified ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Result;