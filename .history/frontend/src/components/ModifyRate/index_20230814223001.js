import React, { useEffect, useState } from 'react';
import { Modal, Form, InputNumber, message, Tooltip } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import baseUrl from '../../config';
const ModifyRate = (props) => {
  const [open, setOpen] = useState(false);
  const token = sessionStorage.getItem('token');
  const [form] = useForm();

  const modify_rate = async (values) => {
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
      }else{
        message.error(data.msg);
      }
    } else {
        message.error('Wrong connection!');
    }
  }

  const handleOk = () => {
    form.submit();  
};

  const onFinish = (values) => {
    modify_rate(values);
  };

  return (
    <>
    {props.text!==0 &&
      <Tooltip title="Click here to modify rate" color='#108ee9'>
      <button className="link-button" type="button" onClick={() => setOpen(true)}>
        {props.record.rate}
      </button>
      </Tooltip>}
        
      <Modal
        title="Modify Rate"
        open={open}
        onOk={() => handleOk()}
        onCancel={() => setOpen(false)}
        width={300}
        destroyOnClose={true}
        okText='Submit'
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="horizontal"
          style={{
            maxWidth: 600,
            marginTop: 30,
          }}
        >
          <Form.Item label="Rate" name="rate">
            <InputNumber min={0}/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModifyRate;