import React, { useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

function Demo() {
  // const [transcription, setTranscription] = useState([]);
  // let recognition = null;

  // if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  //   // Create SpeechRecognition instance
  //   recognition = new (window.SpeechRecognition ||
  //     window.webkitSpeechRecognition)();

  //   recognition.continuous = true;
  //   recognition.interimResults = true;

  //   recognition.onresult = (event) => {
  //     let interimTranscription = '';
  //     let finalTranscription = '';

  //     for (let i = event.resultIndex; i < event.results.length; i++) {
  //       const transcript = event.results[i][0].transcript;

  //       if (event.results[i].isFinal) {
  //         finalTranscription += transcript + ' ';
  //       } else {
  //         interimTranscription += transcript;
  //       }
  //     }

  //     setTranscription((prev) => [...prev, finalTranscription]);
  //   };

  //   recognition.onerror = (event) => {
  //     console.error('Speech recognition error:', event.error);
  //   };

  //   recognition.onend = () => {
  //     // You can restart recognition here if needed
  //   };
  // } else {
  //   console.error('SpeechRecognition is not supported in this browser');
  // }

  // const startRecognition = () => {
  //   if (recognition) {
  //     recognition.start();
  //   }
  // };

  // const stopRecognition = () => {
  //   if (recognition) {
  //     recognition.stop();
  //   }
  // };

  const {
    transcript,
    listening,

    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    // <div>
    //   <button onClick={startRecognition}>Start Speech Recognition</button>
    //   <button onClick={stopRecognition}>Stop Speech Recognition</button>
    //   {transcription.map((transcription) => {
    //     return <p key={Math.random()}>{transcription}</p>;
    //   })}
    //   {/* <p>{transcription}</p> */}
    // </div>

    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
}

export default Demo;
