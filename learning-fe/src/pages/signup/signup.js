import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import { server_url } from '../../config';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { confirm_password, ...remainValues } = values;

    axios
      .post(server_url + '/users', remainValues)
      .then((res) => {
        navigate('/signin');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className='signup-form'>
        <h1 className='heading'>Signup Form</h1>
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
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
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

          <Form.Item
            label='Confirm Password'
            name='confirm_password'
            rules={[
              {
                required: true,
                message: 'Please enter confirm password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The new password that you entered do not match!')
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <p style={{ textAlign: 'center' }}>
            Already have an account ?{' '}
            <span
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={() => navigate('/signin')}
            >
              Sign in here.
            </span>{' '}
          </p>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              type='primary'
              htmlType='submit'
              style={{
                marginTop: '10px',
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Signup;
