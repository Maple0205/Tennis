import React, { useState } from 'react';
import { Button, Modal, Input, InputNumber, Form,Tooltip } from 'antd';

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
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const CreateAccount = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    create_account(values);
    setIsModalOpen(false);
  };

  const create_account=async(values)=>{
    const token = sessionStorage.getItem('token');
    const res = await fetch("http://localhost:5005/api/v1/account",{
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        email: values.email,
        balance: values.balance
      })
    })
    const data = await res.json();
    if(res.status===200){
      if(data.status!==200){
        alert(data.msg);
      }else{
        alert("Succeed!");
        form.resetFields();
      }
    }else{
      alert("Wrong connection!");
    }
  }
  return (
    <>
      <Tooltip title="Create a new account" color='#108ee9'>
        <Button type="primary" onClick={showModal}>
          New Account
        </Button>
      </Tooltip>

      <Modal title="Create a New Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
            marginTop:'30px',
            marginLeft:'-20px'
          }}
          validateMessages={validateMessages}
        >
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
            <Input style={{width:'300px'}}/>
          </Form.Item>
          <Form.Item
            name={['balance']}
            label="Balance"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 100000,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
        </div>
        </Form>
      </Modal>
    </>
  );
};
export default CreateAccount;