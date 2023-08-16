import React,{useState} from 'react';
import { Button, Form, Tooltip,message, DatePicker } from 'antd';
import baseUrl from '../../config';

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

const UpdateRecord = (props) => {
const selected = props.selected;
const [isLoading, setIsLoading] = useState(false);
const update_record=async(values)=>{
  setIsLoading(true);
  const token = sessionStorage.getItem('token');
  const res = await fetch(baseUrl+"record/"+selected.id,{
    method: "PUT",
    headers: {
      'accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({
      date: values.date.format('YYYY-MM-DD'),
      remark: selected.remark,
      account_id: selected.account_id,
      class_type: selected.class_type,
      start_time: selected.start_time,
      end_time: selected.end_time,
      rate: selected.rate,
      recharge: selected.recharge,
      bonus: selected.bonus,
      name: selected.name,
      fee: selected.fee,
      hours: selected.hours,
    })
  })
  const data = await res.json();
  if(res.status===200){
    if(data.status!==200){
      message.error(data.msg);
    }else{
      message.success("Update record successfully!");
      props.setIsModalOpen1Fn(false);
      props.get_records(selected.account_id);
    }
  }else{
    message.error("Wrong connection!");
  }
  setIsLoading(false);
}
const onFinish = (values) => {
  update_record(values);
};

const MediaMatch = window.matchMedia('(max-width: 500px)');
  return (
    <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
      margin: 'auto',
      width:'100%',
      marginTop: {MediaMatch} ? 0 : 20,
      marginLeft: {MediaMatch} ? 0 : -20,
      display: 'flex',        // 使用flex布局
      flexDirection: 'column', // 垂直布局
    }}
    validateMessages={validateMessages} 
  >
    <Form.Item
      name={['date']}
      label="Date"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <DatePicker/>
    </Form.Item>

    {
      MediaMatch.matches ? <Button
      type="primary"
      htmlType="submit"
      style={{ alignSelf: 'flex-end'}}
      loading={isLoading}
    >
      Submit
    </Button> : <Tooltip title="Click here to modify date" color="#108ee9">
      <Button
        type="primary"
        htmlType="submit"
        style={{ alignSelf: 'flex-end', marginRight: '-20px' }}
        loading={isLoading}
      >
        Submit
      </Button>
    </Tooltip>
    }

  </Form>
  )
}
export default UpdateRecord;