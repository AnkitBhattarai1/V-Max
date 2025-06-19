import React, { useState, useEffect, useRef } from 'react';
import './InitialPage.css';
import { useNavigate } from 'react-router-dom';

import home from '../Imges/Home.mp4';
import home1 from '../Imges/Home1.mp4';
import home2 from '../Imges/Home2.mp4';
import home3 from '../Imges/Home3.mp4';

const videoFiles = [home, home1, home2, home3];

const faqs = [
  {
    question: 'What is V-MAX?',
    answer: 'V-MAX is a video streaming platform that allows you to watch a wide variety of TV shows, movies, documentaries, and more on thousands of internet-connected devices.'
  },
  {
    question: 'How much does V-MAX cost?',
    answer: 'Watch V-MAX on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one low fixed monthly fee. Plans start from just $4.99 a month.'
  },
  {
    question: 'Where can I watch?',
    answer: 'You can watch anywhere, anytime. Sign in with your V-MAX account to watch instantly on the web or on devices with the V-MAX app.'
  },
  {
    question: 'How do I cancel?',
    answer: 'V-MAX is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks.'
  },
  {
    question: 'What can I watch on V-MAX?',
    answer: 'V-MAX has an extensive library of feature films, documentaries, TV shows, anime, award-winning V-MAX originals, and more.'
  },
  {
    question: 'Is V-MAX good for kids?',
    answer: 'The V-MAX Kids experience is included in your membership to give parents control while kids enjoy family-friendly content.'
  }
];

export const Initialpage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleVideoEnd = () => {
    const nextIndex = (currentVideoIndex + 1) % videoFiles.length;
    setCurrentVideoIndex(nextIndex);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((e) => console.log(e));
    }
  }, [currentVideoIndex]);

  return (
    <div className="initial-container">
      {/* Autoplay Video Section */}
      <div className="video-wrapper">
        <video
          key={currentVideoIndex}
          ref={videoRef}
          src={videoFiles[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
        <div className="video-text">
          <h1>Welcome to V-MAX</h1>
          <p>Your Ultimate Video Partner</p>
          <div className="button-container">
            <button className="action-btn" onClick={() => navigate('/signup')}>
              Sign Up 
            </button>
            <button className="action-btn" onClick={() => navigate('/Login')}>
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h1>Frequently Asked Questions</h1>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button className="faq-question" onClick={() => toggleFaq(index)}>
              {faq.question}
              <span className="faq-icon">{openIndex === index ? '✖' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
