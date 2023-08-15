import React, { useState } from 'react';
import { Button, Form, Input, Select, Tooltip, message, Row, Col } from 'antd';
import SearchAccountTool from '../SearchAccountTool';
import CreateAccount from '../CreateAccount';
import baseUrl from '../../config';
import Media from 'react-media';  
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
};

const CreateClient = () => {
  const [account, setAccount] = useState(null);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = (values) => {
    create_client(values, account);
  };
  /* eslint-enable no-template-curly-in-string */
const create_client=async(values,account)=>{
  setIsLoading(true);
  const token = sessionStorage.getItem('token');
  if(account===null){
    message.error("Please select an account!");
    return;
  }
  const res = await fetch(baseUrl+"client",{
    method: "POST",
    headers: {
      'accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({
      email: values.email,
      name: values.name,
      phone: values.phone,
      level: parseInt(values.level),
      aid: parseInt(account)
    })
  })
  const data = await res.json();
  if(res.status===200){
    if(data.status!==200){
      message.error(data.msg);
    }else{
      message.success("Succeeded!");
      form.resetFields();
    }
  }else{
    message.error("Wrong connection!");
  }
  setIsLoading(false);
}

const handleAccount = (value) => {
  console.log('value:', value);
  setAccount(value);
  form.setFieldsValue({ account: value });
};

  return (
    <Form
    {...layout}
    form={form}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
      alignItems: 'left',
      alignSelf: 'center',
      margin: 'auto',
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['name']}
      label="Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input/>
    </Form.Item>
    <Form.Item
      name={['email']}
      label="Email"
      rules={[
        {
          type: 'email',
          required: true,
        },
      ]}
    >
      <Input/>
    </Form.Item>
    <Form.Item name={['phone']} label="Phone">
      <Input/>
    </Form.Item>
    <Form.Item
      name={['level']}
      label="Level"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Select placeholder="Please select a level">
        <Option value="1">Primary</Option>
        <Option value="2">Middle</Option>
        <Option value="3">Advanced</Option>
      </Select>
    </Form.Item>
    <Form.Item
      name={['account']}
      label="Account"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <SearchAccountTool setAccount={handleAccount}/>
    </Form.Item>
      {matchMedia("(max-width: 500px)").matches ? (    <Form.Item  
    >
      <div>
    <span style={{marginRight:'20px'}}><CreateAccount /></span>
    <span>
    <Tooltip title="Submit this form" color='#108ee9'>
      <Button type="primary" htmlType="submit" loading={isLoading}>
      Submit
    </Button>
    </Tooltip>
    </span></div>
    </Form.Item>):
      (    <Form.Item  
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <div>
      <span style={{marginRight:'20px'}}><CreateAccount /></span>
      <span>
      <Tooltip title="Submit this form" color='#108ee9'>
        <Button type="primary" htmlType="submit" loading={isLoading}>
        Submit
      </Button>
      </Tooltip>
      </span></div>
      </Form.Item>)
      }
  </Form>
  )
}

export default CreateClient;