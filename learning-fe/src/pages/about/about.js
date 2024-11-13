import React from 'react';
import './about.css';
import AuthWrapper from '../../components/authWrapper/AuthWrapper';

import MainLayout from '../../Layout/MainLayout';

function About() {
  return (
    <>
      <AuthWrapper>
        <MainLayout>
          <div className='about-div'>
            <h1 className='about-title'>About Us</h1>
            <p>
              Welcome to our platform! We're passionate about providing a unique
              and engaging experience for language learners around the world.
              Our mission is to make language learning accessible, enjoyable,
              and effective for everyone.
            </p>

            <h3 className='h3-heading'>Comprehensive Learning Resources</h3>
            <p>
              Our platform offers a wide range of language learning resources,
              including vocabulary lessons, grammar guides, interactive
              exercises, and cultural insights. Whether you're a beginner or an
              advanced learner, you'll find something valuable to enhance your
              language skills.
            </p>

            <h3 className='h3-heading'>Diverse Language Options</h3>
            <p>
              With a focus on inclusivity, we support a multitude of languages,
              allowing you to explore and learn languages from various regions
              and cultures. Our goal is to foster a global community of language
              learners who appreciate linguistic diversity.
            </p>

            <h3 className='h3-heading'>Innovative Technology</h3>
            <p>
              We leverage cutting-edge technology to provide an immersive and
              interactive learning experience. From speech recognition for
              pronunciation practice to personalized learning paths, our
              platform is designed to adapt to your needs and learning style.
            </p>

            <h3 className='h3-heading'>Meet the Team</h3>
            <p>
              Behind the scenes, our dedicated team is committed to creating a
              positive and supportive learning environment. From language
              experts to tech wizards, each team member plays a crucial role in
              shaping the future of language education.
            </p>

            <h3 className='h3-heading'>Contact Us</h3>

            <p>
              We'd love to hear from you! Whether you have feedback,
              suggestions, or just want to say hello, feel free to reach out to
              us at [learningo@contact.com]. Your input helps us improve and
              tailor our platform to meet your language learning needs.
            </p>

            <p>Thank you for being part of our language learning journey!</p>
          </div>
        </MainLayout>
      </AuthWrapper>
    </>
  );
}

export default About;
