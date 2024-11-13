import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import './signin.css';
import { useNavigate } from 'react-router-dom';
import { server_url } from '../../config';
import axios from 'axios';

function Signin() {
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const onFinish = (values) => {
    console.log('Success:', values);
    // setError('');

    axios
      .post(server_url + '/users/signin', values)
      .then((res) => {
        localStorage.setItem('accessToken', res.data);
        navigate('/');
      })
      .catch((error) => {
        // console.log('error', error);
        if (error) {
          setError('Incorrect Username or Password');
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className='signin-form'>
        <h1 className='heading'>Signin Form</h1>
        <Form
          name='basic'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <p className='signup-acc'>
            Don't have an account ?{' '}
            <span
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={() => navigate('/signup')}
            >
              Sign up here.
            </span>{' '}
          </p>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>

          {error && <p className='error-class'>{error}</p>}
        </Form>
      </div>
    </>
  );
}

export default Signin;
