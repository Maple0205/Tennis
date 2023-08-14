  import React from 'react';
  import { Button, Form, Input, Select,message } from 'antd';

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
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const UpdateClient = (props) => {
  /* eslint-enable no-template-curly-in-string */
  const update_client=async(values)=>{
    const token = sessionStorage.getItem('token');
    const res = await fetch("http://localhost:5005/api/v1/client/"+props.selected.id,{
      method: "PUT",
      headers: {
        'accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        email: values.email,
        name: values.name,
        phone: values.phone,
        level: parseInt(values.level),
        aid: props.selected.aid
      })
    })
    const data = await res.json();
    if(res.status===200){
      if(data.status!==200){
        message.error(data.msg);
      }else{
        message.success("Modify client successfully!");
        props.setIsModalOpen1Fn(false);
        props.getClients();
      }
    }else{
      message.error("Wrong connection!");
    }
  }
  const onFinish = (values) => {
    update_client(values);
  };
    return (
      // <div style={{ marginTop:'30px', display:'flex', margin:'auto'}}>
      <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        margin: 'auto',
        width:'100%',
        marginTop: '30px',
        marginLeft: '-20px',
        display: 'flex',        // 使用flex布局
        flexDirection: 'column', // 垂直布局
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
        initialValue={props.selected.name}
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
        initialValue={props.selected.email}
      >
        <Input/>
      </Form.Item>
      <Form.Item name={['phone']} label="Phone" initialValue={props.selected.phone}>
        <Input />
      </Form.Item>
      <Form.Item name={['level']} label="Level" initialValue={props.selected.level}
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
        <Button
          type="primary"
          htmlType="submit"
          style={{ alignSelf: 'flex-end', marginRight: '-120px' }}
        >
          Submit
        </Button>
    </Form>
    // </div>
    )
  }
  export default UpdateClient;