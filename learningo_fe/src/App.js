import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Signin from './pages/signin/signin';
import Signup from './pages/signup/signup';
import Home from './pages/home/home';
import Practice from './pages/practice/practice';
import About from './pages/about/about';
import LearnByYourSelf from './pages/learnByYourself/LearnByYourSelf';
import PracticeTest from './pages/practice-test/test';
import Demo from './pages/demo';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <HeaderBar /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/practice' element={<Practice />} />
          <Route path='/test' element={<PracticeTest />} />
          <Route path='/learn' element={<LearnByYourSelf />} />
          <Route path='/about' element={<About />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/demo' element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
