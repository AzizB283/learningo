import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './header.css';
import { Button, Drawer } from 'antd';

function HeaderBar() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 575);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {!isMobile ? (
        <div className='header'>
          <ul className='menu'>
            <li>
              <Link to='/'>Learningo</Link>
            </li>
            <li>
              <Link to='/'>Home</Link>
            </li>

            <li>
              <Link to='/test'>Test</Link>
            </li>

            <li>
              <Link to='/learn'>Learn By Yourself</Link>
            </li>

            <li>
              <Link to='/about'>About</Link>
            </li>
          </ul>

          <p
            style={{ cursor: 'pointer', marginRight: '20px' }}
            onClick={() => {
              localStorage.clear();
              navigate('/signin');
            }}
          >
            Logout
          </p>
        </div>
      ) : (
        <>
          <div className='mobile-header'>
            <p>
              <Link to='/'>Learningo</Link>
            </p>

            <Button
              type='text'
              icon={<MenuFoldOutlined />}
              onClick={() => setOpen(true)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color: 'white',
              }}
            />
          </div>

          <Drawer
            // title='Basic Drawer'
            placement='right'
            closable={false}
            onClose={onClose}
            open={open}
            // key={right}
          >
            <p className='close-menu' onClick={onClose}>
              X
            </p>
            <ul className='mobile-menu'>
              <li>
                <Link to='/'>Home</Link>
              </li>

              <li>
                <Link to='/test'>Test</Link>
              </li>

              <li>
                <Link to='/learn'>Learn By Yourself</Link>
              </li>

              <li>
                <Link to='/about'>About</Link>
              </li>

              <li>
                <Link to='/signin'>Logout</Link>
              </li>
            </ul>
          </Drawer>
        </>
      )}
    </>
  );
}

export default HeaderBar;
