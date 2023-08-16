import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, message,Tooltip } from 'antd';
import baseUrl from '../../config';
import Media from 'react-media';
const ClassTypeModal  = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); 
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const token = sessionStorage.getItem('token');
    const res = await fetch(baseUrl+'class_type',{
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
    setLoading(false);
  }

  const MediaMatch = window.matchMedia('(max-width: 500px)');
  
  return (
    <>
    {
      MediaMatch.matches ?   <div style={{ textAlign: 'left', marginBottom: '20px' }}>
        <Button type="primary" onClick={showModal}>
          Add Type
        </Button>
      </div> :  
        <Tooltip title="Add a new class type" color='#108ee9'>
          <Button type="primary" onClick={showModal}>
            Add Type
          </Button>
        </Tooltip>
    }

      <Modal
      title="Add New Type"
      open={isModalOpen}
      width={MediaMatch.matches ? 500 : 230}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          Submit
        </Button>
      ]}
    >
        <Form
          form={form}
          onFinish={onFinish}
          layout= "horizontal"
          style={{
            maxWidth: MediaMatch.matches ? 500 : "100%",
            marginTop: MediaMatch.matches ? 20 : 0,
            marginLeft: MediaMatch.matches ? 0 : 20,
          }}
        >
          <Form.Item label="TypeName" name="type_name">
            <Input />
          </Form.Item>
          <Form.Item label="Rate" name="rate">
            {MediaMatch.matches ? <InputNumber min={0}/> : <InputNumber min={0} style={{width: '100%'}}/>}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ClassTypeModal ;