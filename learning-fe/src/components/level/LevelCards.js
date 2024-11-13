import React, { useEffect, useRef, useState } from 'react';
import './level.css';
import { Button, Progress } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { server_url } from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from '../authWrapper/AuthWrapper';

const synth = window.speechSynthesis;

function LevelCards() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [data, setData] = useState(resData);
  const [completePercentage, setCompletePercentage] = useState(0);
  const [resData, setResData] = useState([]);
  const [error, setError] = useState('');
  const isGetProgress = useRef(false);
  const isGetData = useRef(false);
  const [nextButtonClicked, setNextButtonClicked] = useState(false); // Track next button click

  const language = sessionStorage.getItem('language');
  const difficultyLevel = sessionStorage.getItem('difficultyLevel');
  const token = localStorage.getItem('accessToken');

  // Handle next function and update the progress
  const handleNext = () => {
    console.log('handle next calling');
    setCurrentIndex((prev) => prev + 1);

    let value = {
      language: language,
      difficultyLevel: difficultyLevel,
      completePercentage: completePercentage,
    };

    axios
      .patch(server_url + '/learning-progress/update', value, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((error) => {
        console.log('Error', error);
      });
  };

  // handle previous
  const handlePrevious = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  // Function for playing audio

  const playAudio = () => {
    const utterThis = new SpeechSynthesisUtterance(
      resData[currentIndex]?.pronounciation
    );
    utterThis.rate = 1;
    // utterThis.lang = 'ar-YE';
    synth.speak(utterThis);
  };

  // Call handleNext when percentage is change

  useEffect(() => {
    if (nextButtonClicked) {
      console.log('this useeffcet runs');
      if (completePercentage > 0 && completePercentage !== 100) {
        handleNext();
      } else if (completePercentage === 100) {
        console.log('goes in else if');
        handleNext();
        navigate('/');
      }
      // Reset the nextButtonClicked state after handling the click
      setNextButtonClicked(false);
    }
  }, [completePercentage, nextButtonClicked]);

  // useEffect for getting progress regarding to language and setcurrent index according to progress
  useEffect(() => {
    setError('');
    // if (!isGetProgress.current) {
    let value = {
      language: language,
      difficultyLevel: difficultyLevel,
    };
    axios
      .post(server_url + '/learning-progress/get-single-progress', value, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data === 100) {
          console.log(res.data);
          setCurrentIndex(0);
        } else {
          setCurrentIndex(Math.round((res.data / 100) * (resData.length - 1)));
        }
        setCompletePercentage(res.data);
      })
      .catch((error) => {
        // console.log(error);
        setError(error);
      });

    // isGetProgress.current = true;
    // }
  }, [resData]);

  // Get data using language and difficulty level
  useEffect(() => {
    if (!isGetData.current) {
      axios
        .get(`${server_url}/translation/${language}/${difficultyLevel}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setResData(res.data);
        })
        .catch((error) => {
          // console.log(error);
          setError('Some error occured. Please, try again.');
        });

      isGetData.current = true;
    }
  }, []);

  return (
    <>
      <AuthWrapper>
        <div className='pro-test'>
          <h2>You are learning - {language}</h2>
          <h2>Progress </h2>
          <Progress
            style={{ marginTop: 20 }}
            type='circle'
            percent={completePercentage}
            size={100}
          />
          {/* <Button type='primary' className='sbmt-btn'>
            Practice Test
          </Button> */}
        </div>
        <div className='card'>
          <div className='card-body'>
            <p>English : {resData[currentIndex]?.englishWord}</p>
            <p>Translation : {resData[currentIndex]?.translatedWord}</p>
            <p>Pronounciation : {resData[currentIndex]?.pronounciation}</p>
            <p onClick={playAudio}>
              Speak :{' '}
              <span style={{ cursor: 'pointer' }}>
                <SoundOutlined />
              </span>
            </p>
          </div>
        </div>

        <div className='prev-next'>
          <Button
            type='primary'
            className='sbmt-btn'
            onClick={handlePrevious}
            disabled={currentIndex === 0 ? true : false}
          >
            Previous
          </Button>
          {currentIndex !== resData?.length - 1 ? (
            <Button
              type='primary'
              className='sbmt-btn'
              onClick={() => {
                const dynamicallyAdjustedPercentage = Math.round(
                  (currentIndex + 1) * (100 / resData.length)
                );
                console.log('dunamic', dynamicallyAdjustedPercentage);
                if (completePercentage <= dynamicallyAdjustedPercentage) {
                  setCompletePercentage(
                    // (prev) => prev + dynamicallyAdjustedPercentage
                    dynamicallyAdjustedPercentage
                  );
                  setNextButtonClicked(true);
                } else {
                  setCurrentIndex((prev) => prev + 1);
                }
              }}
              disabled={currentIndex === resData?.length - 1 ? true : false}
            >
              Next
            </Button>
          ) : (
            <Button
              type='primary'
              className='sbmt-btn'
              onClick={() => {
                const dynamicallyAdjustedPercentage = Math.round(
                  (currentIndex + 1) * (100 / resData.length)
                );
                // if (completePercentage === 90) {
                setCompletePercentage(dynamicallyAdjustedPercentage);
                // }
                setNextButtonClicked(true);
              }}
            >
              Submit
            </Button>
          )}
        </div>
        {error && <p className='error-class'>{error}</p>}
      </AuthWrapper>
    </>
  );
}

export default LevelCards;
