import React, { useEffect, useState } from 'react';
import './test.css';
import { Select, Button, Radio, Space } from 'antd';
import axios from 'axios';
import { server_url } from '../../config';
import { useNavigate } from 'react-router-dom';

function Test() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const [dropdownValue, setDropdownValue] = useState('Spanish');
  const [error, setError] = useState('');
  const [resData, setResData] = useState([]);
  const [value, setValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ans, setAns] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ansSubmitted, setAnsSubmitted] = useState(false);
  const [correctAns, setCorrectAns] = useState([]);
  const [finalScore, setFinalScore] = useState('');
  const [showQuestions, setShowQuestions] = useState(false);

  const optionChange = (value) => {
    setDropdownValue(value);
  };

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setAns((prev) => [...prev, value]);
    setValue('');
  };

  const handleSubmit = () => {
    setError('');
    setAnsSubmitted(false);
    setCurrentIndex(0);
    setAns([]);
    setValue('');

    axios
      .get(server_url + '/translation/' + dropdownValue, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setResData(res.data);
        let corAns = res?.data?.map((crectopp) => crectopp.translatedWord);

        setCorrectAns(corAns);
        setShowQuestions(true);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getScore = () => {
    // Compare ans and correctAns to calculate the score

    let score = 0;
    ans.forEach((userAnswer, index) => {
      if (userAnswer === correctAns[index]) {
        score += 1;
      }
    });

    setFinalScore(score);
    setIsSubmitted(false);
  };

  useEffect(() => {
    if (ansSubmitted) {
      getScore();
    }
  }, [ansSubmitted]);

  return (
    <>
      <div className='practice-test'>
        <h2>For which language you want to give the test ? </h2>

        <Select
          defaultValue={dropdownValue}
          style={{
            width: 140,
          }}
          disabled={isSubmitted}
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
          ]}
        />

        <Button
          type='primary'
          className='sbmt-btn'
          onClick={handleSubmit}
          disabled={isSubmitted}
        >
          Submit
        </Button>
      </div>
      {showQuestions && (
        <>
          <div className='mcqs-section'>
            <h2>Practice Test for {dropdownValue}</h2>
            <div className='mcqs'>
              <p className='question'>
                <span style={{ fontWeight: 'bold' }}>Question :</span>{' '}
                <span>What is the translated word for </span>
                <span
                  style={{ fontWeight: 'bold', textDecoration: 'underline' }}
                >
                  {resData[currentIndex]?.englishWord}
                </span>{' '}
                in {dropdownValue} ?
              </p>

              <Radio.Group
                onChange={onChange}
                value={value}
                className='radio-grp'
              >
                <Space direction='vertical'>
                  {resData[currentIndex]?.options?.map((option, index) => (
                    <Radio value={option}>{option}</Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
            {currentIndex !== resData?.length - 1 ? (
              <Button
                type='primary'
                className='sbmt-btn'
                onClick={handleNext}
                disabled={value?.length === 0}
              >
                Next
              </Button>
            ) : (
              !ansSubmitted && (
                <Button
                  type='primary'
                  className='sbmt-btn'
                  onClick={() => {
                    setAns((prev) => [...prev, value]);
                    // setIsSubmitted(false);
                    setAnsSubmitted(true);
                  }}
                >
                  Submit
                </Button>
              )
            )}

            {ansSubmitted && (
              <>
                <h2>
                  You Score : {finalScore}/{resData?.length}
                </h2>

                <Button
                  type='primary'
                  className='sbmt-btn'
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Go to Home
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Test;
