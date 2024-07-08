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
      <p>Student Name: {result.name}</p>
      <p>School Name: {result.school}</p>
      <p>Marks Obtained: {result.marks}</p>
      <p>Qualified for Second Round: {result.qualified ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default Result;