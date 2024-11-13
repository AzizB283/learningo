import React, { useEffect, useState } from 'react';
import { Select, Button, Progress } from 'antd';
import './selection.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server_url } from '../../config';
import AuthWrapper from '../authWrapper/AuthWrapper';

function SelectLanguage() {
  const navigate = useNavigate();
  const localLanguage = sessionStorage.getItem('language');
  const [dropdownValue, setDropdownValue] = useState(
    localLanguage ? localLanguage : 'Spanish'
  );
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState();
  const token = localStorage.getItem('accessToken');

  const optionChange = (value) => {
    setDropdownValue(value);
    const language = { language: value };

    axios
      .post(server_url + '/learning-progress/get-progress', language, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProgress(res.data);
      })
      .catch((error) => {
        setError(error);
        // console.log(error);
      });
  };

  const handleSubmit = () => {
    setError('');
    sessionStorage.setItem('language', dropdownValue);
    sessionStorage.setItem('difficultyLevel', difficultyLevel);
    if (difficultyLevel.length === 0) {
      setError('Please select any one level');
    } else {
      navigate('practice');
    }
  };

  useEffect(() => {
    setError('');
    const language = { language: dropdownValue };
    axios
      .post(server_url + '/learning-progress/get-progress', language, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProgress(res.data);
      })
      .catch((error) => {
        setError(error);
        // console.log(error);
      });
  }, []);

  // console.log(difficultyLevel);

  return (
    <>
      <AuthWrapper>
        <div className='select-dropdown'>
          <h2>Select Any One Language That You Want To Learn Today</h2>

          <Select
            defaultValue={dropdownValue}
            style={{
              width: 240,
            }}
            onChange={(value) => optionChange(value)}
            options={[
              {
                value: 'Spanish',
                label: 'Spanish',
              },
              {
                value: 'Mandarin Chinese',
                label: 'Mandarin Chinese',
              },
              {
                value: 'French',
                label: 'French',
              },
              {
                value: 'German',
                label: 'German',
              },

              {
                value: 'Japanese',
                label: 'Japanese',
              },

              {
                value: 'Russian',
                label: 'Russian',
              },

              {
                value: 'Arabic',
                label: 'Arabic',
              },

              {
                value: 'Italian',
                label: 'Italian',
              },

              // {
              //   value: 'Portuguese',
              //   label: 'Portuguese',
              // },
              // {
              //   value: 'Korean',
              //   label: 'Korean',
              // },
            ]}
          />

          <h2>Your Progress in {dropdownValue}</h2>
          <div className='progress-bar'>
            <div>
              <p className='progress-para'>Beginner</p>
              <Progress type='circle' percent={progress?.alphabet} size={80} />
            </div>

            <div>
              <p className='progress-para'>Intermediate</p>
              <Progress type='circle' percent={progress?.word} size={80} />
            </div>

            <div>
              <p className='progress-para'>Advance</p>
              <Progress type='circle' percent={progress?.sentence} size={80} />
            </div>
          </div>

          <h2>Select The Level</h2>
          <div className='cards'>
            <div
              className={`insider-card card-1 ${
                difficultyLevel !== ''
                  ? difficultyLevel === 'alphabet'
                    ? ''
                    : 'not-selected'
                  : ''
              }`}
              onClick={() => setDifficultyLevel('alphabet')}
            >
              Beginner Level
            </div>
            <div
              className={`insider-card card-2 ${
                difficultyLevel !== ''
                  ? difficultyLevel === 'word'
                    ? ''
                    : 'not-selected'
                  : ''
              }`}
              onClick={() => setDifficultyLevel('word')}
            >
              Intermediate Level
            </div>
            <div
              className={`insider-card card-3 ${
                difficultyLevel !== ''
                  ? difficultyLevel === 'sentence'
                    ? ''
                    : 'not-selected'
                  : ''
              }`}
              onClick={() => setDifficultyLevel('sentence')}
            >
              Advanced Level
            </div>
          </div>

          <Button type='primary' className='sbmt-btn' onClick={handleSubmit}>
            Submit
          </Button>

          {error && <p className='error-class'>{error}</p>}
        </div>
      </AuthWrapper>
    </>
  );
}

export default SelectLanguage;
