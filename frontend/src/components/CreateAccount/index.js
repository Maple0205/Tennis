import React, { useState } from 'react';
import { Button, Modal, Input, InputNumber, Form,Tooltip, message } from 'antd';
import baseUrl from '../../config';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

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
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    const token = sessionStorage.getItem('token');
    const res = await fetch(baseUrl+"account",{
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
        message.error(data.msg);
      }else{
        message.success("Succeed!");
        form.resetFields();
        setIsLoading(false);
      }
    }else{
      message.error("Wrong connection!");
    }
  }

  const MediaMatch = window.matchMedia('(max-width: 500px)');
  return (
    <>
      <Tooltip title="Create a new account" color='#108ee9'>
        <Button type="primary" onClick={showModal}>
          New Account
        </Button>
      </Tooltip>

      <Modal title="Create a New Account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={750}>
        <Form
          {...layout}
          form={form}
          name="create-account"
          onFinish={onFinish}
          style={{
            margin: 'auto',
            width:'100%',
            marginTop: '30px',
            marginLeft: MediaMatch.matches? '0':'-20px',
            display: 'flex',        // 使用flex布局
            flexDirection: 'column', // 垂直布局
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
            <Input/>
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
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </div>
        </Form>
      </Modal>
    </>
  );
};
export default CreateAccount;