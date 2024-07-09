import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Result.css'

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
    <div className='item'>
      <img src="/src/assets/bg2.png" alt="logo"/>
      <h1 className='headingR'>Result</h1>
      <div className='resultCard'>
      <p>Student Name: {result.name}</p>
      <p>School Name: {result.school}</p>
      <p>Marks Obtained: {result.marks}</p>
      <p>Qualified for Second Round: {result.qualified ? 'Yes' : 'No'}</p>
      </div>
      <div className='ormSheet'>
      {result.omr && (
        <div>
          <h2 className='headingR'>OMR Sheet</h2>
          <img src={result.omr} alt="OMR" style={{width: '100%', maxWidth: '600px'}}/>
        </div>
      )}
      </div>
    </div>
  );
};

export default Result;