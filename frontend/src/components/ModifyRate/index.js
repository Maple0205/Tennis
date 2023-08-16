import React, { useState } from 'react';
import { Modal, Form, InputNumber, message, Tooltip, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import baseUrl from '../../config';
import Media from 'react-media';
const ModifyRate = (props) => {
  const [open, setOpen] = useState(false);
  const token = sessionStorage.getItem('token');
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const modify_rate = async (values) => {
    setIsLoading(true);
    console.log(props.record);
    const res = await fetch(baseUrl+"class_type/" + props.record.id, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        type_name: props.record.type_name,
        rate: values.rate,
      })
    })
    const data = await res.json();
    if (res.status === 200) {
      if (data.status === 200) {
        message.success("Modify rate successfully!");
        setOpen(false);
        props.getClassType();
        form.resetFields();
      }else{
        message.error(data.msg);
      }
    } else {
        message.error('Wrong connection!');
    }
    setIsLoading(false);
  }

  const handleOk = () => {
    form.submit();  
};

  const onFinish = (values) => {
    modify_rate(values);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const MediaMatch = window.matchMedia('(max-width: 500px)').matches;
  
  return (
    <>
    {props.text!==0 &&
    MediaMatch ? <button className="link-button" type="button" onClick={() => setOpen(true)}>
    {props.record.rate}
  </button> :
      <Tooltip title="Click here to modify rate" color='#108ee9'>
      <button className="link-button" type="button" onClick={() => setOpen(true)}>
        {props.record.rate}
      </button>
      </Tooltip>}
        
      <Modal
        title="Modify Rate"
        open={open}
        width={300}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={() => handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleOk}
          >
            Submit
          </Button>
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout= {MediaMatch ? "vertical" : "horizontal"}
          style={{
            maxWidth: 600,
            marginTop: MediaMatch ? 0 : 20,
          }}
        >
          <Form.Item label="Rate" name="rate">
            <InputNumber min={0}  style={{width: '100%'}}/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModifyRate;