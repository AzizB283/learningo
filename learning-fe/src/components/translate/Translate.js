import React, { useEffect, useRef, useState } from 'react';
import './translate.css';
import { Select, Button, Input } from 'antd';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import axios from 'axios';
import {
  AudioMutedOutlined,
  AudioOutlined,
  SoundOutlined,
} from '@ant-design/icons';

const synth = window.speechSynthesis;

function Translate() {
  const { TextArea } = Input;
  const [options, setOptions] = useState([]);
  const [fromValue, setFromValue] = useState('en');
  const [toValue, setToValue] = useState('hi');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [micStarted, setMicStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalId = useRef(null);
  const [afterSecond, setAfterSecond] = useState(false);

  const fromOptionChange = (value) => {
    setFromValue(value);
  };

  const toOptionChange = (value) => {
    setToValue(value);
  };

  // Function for playing audio

  const playAudio = () => {
    const utterThis = new SpeechSynthesisUtterance(output);

    const voices = window.speechSynthesis.getVoices();

    utterThis.voice = voices[7];
    utterThis.rate = 0.9;
    // utterThis.lang = 'ar-YE';
    synth.speak(utterThis);
  };

  const translate = async () => {
    setError('');
    console.log('inputs length', input);

    if (input.length === 0) {
      setError('Please, enter some text to translate.');
    } else {
      console.log('translate calleds...............');
      setLoading(true);
      const data = {
        q: input,
        source: fromValue,
        target: toValue,
        api_key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      };
      await axios
        .post('https://libretranslate.de/translate', data, {
          headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
          },
        })
        .then((res) => {
          setOutput(res.data.translatedText);
          setElapsedTime((prev) => prev + 6);
          console.log('elapsed time', elapsedTime);
        })
        .catch((error) => {
          setError('Some Error Occured. Please, try again later.');
        });
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get('https://libretranslate.de/languages', {
        headers: { accept: 'application/json' },
      })
      .then((res) => {
        setOptions(res.data);
      })
      .catch((error) => {
        setError('Some Error Occured. Please, try again later.');
      });
  }, []);

  const {
    transcript,
    listening,

    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  // useEffect(() => {
  //   if (micStarted) {
  //     translate();
  //     console.log('interval calling');
  //     intervalId.current = setInterval(() => {
  //       // translate();
  //     }, 6000);
  //   }

  //   return () => {
  //     // console.log('clear interval calling');
  //     clearInterval(intervalId.current);
  //   };
  // }, [micStarted]);

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <div className='translate'>
        <h2>Learn By Yourself</h2>
        <div className='from-to'>
          <p>From : </p>
          <Select
            defaultValue={fromValue}
            style={{
              width: 120,
            }}
            onChange={(value) => fromOptionChange(value)}
            options={options.map((option) => ({
              value: option.code,
              label: option.name,
            }))}
          />

          <p style={{ marginLeft: 15 }}>To : </p>
          <Select
            defaultValue={toValue}
            style={{
              width: 120,
            }}
            onChange={(value) => toOptionChange(value)}
            options={options.map((option) => ({
              value: option.code,
              label: option.name,
            }))}
          />
        </div>

        <div className='textarea'>
          <label htmlFor='textarea'></label>
          <TextArea
            rows={6}
            placeholder='Enter your text here...'
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />

          {!micStarted ? (
            <Button
              type='primary'
              className='sbmt-btn'
              icon={<AudioOutlined />}
              onClick={() => {
                setInput('');
                resetTranscript();
                setMicStarted(true);
                startListening();
                setElapsedTime('');
              }}
              // loading={loading}
            >
              Speak
            </Button>
          ) : (
            <Button
              type='primary'
              className='sbmt-btn'
              icon={<AudioMutedOutlined />}
              onClick={() => {
                setMicStarted(false);
                SpeechRecognition.stopListening();
              }}
              // loading={loading}
            >
              Stop
            </Button>
          )}

          <label htmlFor='textarea'></label>
          <TextArea
            rows={6}
            placeholder='Your translation will be here...'
            value={output}
          />

          <div className='translate-listen'>
            <Button
              type='primary'
              className='sbmt-btn'
              onClick={translate}
              loading={loading}
            >
              Translate
            </Button>

            <Button
              type='primary'
              className='sbmt-btn'
              icon={<SoundOutlined />}
              onClick={playAudio}
              // loading={loading}
            >
              Listen
            </Button>
          </div>

          {error && <p className='error-class'>{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Translate;
