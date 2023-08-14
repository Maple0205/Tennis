import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from "react-router-dom";
import logo from '../../images/icons8-tennis-96.png'
import './style.css'
import baseUrl from '../../config';

const apiPath = 'user/login';
const apiUrl = `${baseUrl}${apiPath}`;

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async(values) => {
    loginBtn(values);
  };
  const loginBtn=async(values)=>{
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user_name: values.username,
        password: values.password,
      })
    });
    const data = await response.json();
    if (data.status !== 200) {
      alert(data.msg);
    } else {
      sessionStorage.setItem('token', data.data.token);
      message.success("Login Succeeded!");
      navigate("/dashboard");
    }
  }
  
  return (
    <div className="login-container">
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      size='large'
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={logo}
          alt="logo"
          style={{
            width: '35px',
            height: '35px',
            marginRight: '10px',
            marginLeft: '30px',
            animation: 'rotate 2s linear infinite', // 应用旋转动画
          }}
        />
        <h2 style={{ margin: '0' }}>Welcome Back</h2>
      </div>

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
      </Form.Item>



      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
          Log in
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};
export default Login;
