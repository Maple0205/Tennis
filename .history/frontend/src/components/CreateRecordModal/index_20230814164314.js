import React, { useState, useEffect } from 'react';
import {
  DatePicker,
  Form,
  TimePicker,
  InputNumber,
  Radio,
  Modal,
  Button,
  Input,
  message,
  Select,
  Tooltip,
} from 'antd';

const { Option } = Select;
const CreateRecordModal  = (props) => {
  const componentDisabled = false;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const client=props.client;
  const token = sessionStorage.getItem('token');
  const [form] = Form.useForm(); 
  const [types, setTypes] = useState([]);
  const [rate, setRate] = useState(null);
  const [hours, setHours] = useState(null);
  const [flag, setFlag] = useState(0);
  const get_class_type = async () => {
    const res = await fetch('http://localhost:5005/api/v1/class_type', {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    });
    const data = await res.json();
    if (res.status !== 200) {
      message.error('Wrong connection!');
    } else {
      if (data.status !== 200) {
        message.error(data.msg);
      } else {
        setTypes(data.data.item);
      }
    }
  };

  const handleChangeType = (id,types) => {
    const type = types.find((type) => type.id === id);
    setRate(type.rate);
  };

  const render_class_type = (types) => {
    return types.map((type) => {
      return (
        <Radio value={type.id} key={type.id}>
          {type.type_name}
        </Radio>
      );
    });
  };

  const onFinish = (values) => {
    if(flag===1){
      values.class_type=null;
      values.start_time=null;
      values.end_time=null;
      values.rate=null;
      values.fee=null;
      values.hours=null;
    }else{
      const start_time = values.class_time[0].format('HH:mm');
      const end_time = values.class_time[1].format('HH:mm');
      values.start_time = start_time;
      values.end_time = end_time;
    }
    const date = values.date.format('YYYY-MM-DD');
    values.date = date;
    values.account_id = client;
    console.log(props.clientName);
    values.name = props.clientName;
    post_record(values);
  };

  const showModal = () => {
    setIsModalOpen(true);
    get_class_type();
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setHours(null);
    setRate(null);
    setFlag(0);
  };

  const render_fee = (flag) => {
    if(flag===2){
      return (
        <>
        <Form.Item label="Hours" name="hours">
          {hours}
        </Form.Item>
        <Form.Item label="Rate" name="rate">
          {rate}
        </Form.Item>
        <Form.Item label="Fee" name="fee">
          {hours*rate===0?null:hours*rate}
        </Form.Item>
        </>
      )
    }else if(flag===3){
      return (
        <>
        <Form.Item label="Hours" name="hours">
          {hours}
        </Form.Item>
        <Form.Item label="Rate" name="rate">
          {rate}
        </Form.Item>
        <Form.Item label="Fee" name="fee">
          {hours*rate===0?null:hours*rate/2}
        </Form.Item>
        </>
      )
    }else{
      return null;
    }
  }

  const post_record = async(values)=>{
    console.log(values);
    const res = await fetch('http://localhost:5005/api/v1/record',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        account_id: values.account_id,
        class_type: values.class_type,
        date: values.date,
        start_time: values.start_time,
        end_time: values.end_time,
        rate: values.rate,
        recharge: values.recharge,
        bonus: values.bonus,
        name: values.name,
        remark: values.remark,
      }),
    })
    const data = await res.json();
    if(res.status!==200){
      alert("Wrong Connection!");
    }else{
      if(data.status!==200){
        alert(data.msg);
      }else{
        alert("Success!");
        props.get_records(client);
        setIsModalOpen(false);
        form.resetFields();
      }
    }
  }
  return (
    <>
    <Tooltip title="Add a new record" color='#108ee9'>
      <Button type="primary" onClick={showModal}  style={{marginBottom:'20px'}}>
        Add
      </Button>
    </Tooltip>
      <Modal title="Add New Record" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={700} okText='Add' destroyOnClose={true}>
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
          disabled={componentDisabled}
          style={{
            width: '100%',
            marginTop: 30,
          }}
          onValuesChange={(changedValues, allValues) => {
            if ("record_type" in changedValues) {
              let newRemark = '';
        
              if (changedValues['record_type'] === "1") {
                newRemark = 'Deposit';
                setFlag(1);
              } else if (changedValues['record_type'] === "2") {
                newRemark = 'Attendance';
                setFlag(2);
              } else if (changedValues['record_type'] === "3") {
                newRemark = 'Absent';
                setFlag(3);
              } else {
                setFlag(0);
              }

              form.setFieldsValue({ remark: newRemark });
              setHours(null);
            }
             
            if ('class_type' in changedValues) {
              handleChangeType(changedValues['class_type'],types); // Call setRate when class_type value changes
            }
            if('class_time' in changedValues){
              let new_hours= null;
              if(changedValues['class_time']!==null && changedValues['class_time']!==undefined){
                const start_time = changedValues['class_time'][0];
                const end_time = changedValues['class_time'][1];
                const minutesDiff = end_time.diff(start_time, 'minutes'); // Calculate difference in minutes
                new_hours = Math.round(minutesDiff / 30) * 0.5
                setHours(new_hours);
              }else{
                setHours(null);
              }
            }
          }}
        >
          <Form.Item label="Record Type" name="record_type" dependencies={['record_type']}>
            <Select placeholder="Please one">
              <Option value="1">Deposit</Option>
              <Option value="2">Check Attendance</Option>
              <Option value="3">Absent</Option>
            </Select>
          </Form.Item>

          { (flag===2 || flag===3) && 
          <><Form.Item label="Class Type" name="class_type" dependencies={['class_type']}>
            <Radio.Group>
              {render_class_type(types)}
            </Radio.Group>
          </Form.Item> 
          <Form.Item label="Class Time" name="class_time" dependencies={['class_time']}>
            <TimePicker.RangePicker minuteStep={30} format="HH:mm"/>
          </Form.Item>
          </>}

          {flag!==0 && 
          <>
          <Form.Item label="Date" name="date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Deposit" name="recharge">
            <InputNumber min={0}/>
          </Form.Item>
          <Form.Item label="Complimentary" name="bonus">
            <InputNumber min={0}/>
          </Form.Item>
          <Form.Item label="Note" name="remark">
            <Input />
          </Form.Item>
          {render_fee(flag)}
          </>}
        </Form>
      </Modal>
    </>
  );
};
export default CreateRecordModal ;