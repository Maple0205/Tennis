import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, message,Tooltip } from 'antd';

const ClassTypeModal  = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); 
  const onFinish = (values) => {
    post_class_type(values);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const post_class_type = async(values)=>{
    const token = sessionStorage.getItem('token');
    const res = await fetch('http://localhost:5005/api/v1/class_type',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        type_name: values.type_name,
        rate: values.rate,
      }),
    })
    const data = await res.json();
    if(res.status!==200){
      alert("Wrong Connection!");
    }else{
      if(data.status!==200){
        alert(data.msg);
      }else{
        message.success("Succeeded!");
        setIsModalOpen(false);
        form.resetFields();
        props.getClassType();
      }
    }
  }
  return (
    <>
  <div style={{ textAlign: 'left', marginBottom: '20px' }}>
  <Tooltip title="Add a new class type" color='#108ee9'>
    <Button type="primary" onClick={showModal}>
      Add Type
    </Button>
  </Tooltip>

  </div>
      <Modal title="Add New Type" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={500} okText='Submit' destroyOnClose={true}>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          form={form}
          onFinish={onFinish}
          layout="horizontal"
          style={{
            maxWidth: 600,
            marginTop: 30,
          }}
        >
          <Form.Item label="TypeName" name="type_name">
            <Input />
          </Form.Item>
          <Form.Item label="Rate" name="rate">
            <InputNumber min={0}/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ClassTypeModal ;