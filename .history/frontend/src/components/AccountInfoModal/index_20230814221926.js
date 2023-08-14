import React, { useEffect, useState } from 'react';
import { Modal, Button, message, Tooltip } from 'antd';
import AccountInfo from '../AccountInfo';
import ChangeAccount from '../ChangeAccount';
import baseUrl from '../../config';

const apiPath = 'account/'; // 示例 API 路径
const apiUrl = `${baseUrl}${apiPath}`;

const AccountInfoModal = (props) => {
  const [open, setOpen] = useState(false);
  const token = sessionStorage.getItem('token');
  const [data, setData] = useState(null);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    getAccountInfo(props.text);
  }, []);

  const getAccountInfo = async (aid) => {
    console.log(aid);
    const res = await fetch(apiUrl + aid, {
      method: "GET",
      headers: {
        'Authorization': token
      }
    })
    const data = await res.json();
    if (res.status === 200) {
      if (data.status === 200) {
        setData(data.data);
      }
    } else {
      alert("Wrong connection!");
    }
  }

  const changeAccount = async (values, aid) => {
    if (aid === null) {
      message.error("Please select an account!");
      return;
    }else if(aid===values.aid){
      message.error("Please select another account!");
      return;
    }
    console.log(values);
    console.log(aid);
    const res = await fetch("http://localhost:5005/api/v1/client/" + values.id, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        aid: aid,
        email: values.email,
        name: values.name,
        phone: values.phone,
        level: values.level,
      })
    })
    const data = await res.json();
    if (res.status === 200) {
      if (data.status === 200) {
        message.success("Change Account successfully!");
        getAccountInfo(aid);
        props.getClients();
      } else {
        message.error(data.msg);
      }
    } else {
      message.error("Wrong connection!");
    }
  }

  return (
    <>
    {props.text!==0 &&
    <div>
    <Tooltip title="View the information of this account" color='#108ee9'>
      <button className="link-button" type="button" onClick={() => setOpen(true)}>
        {props.text}
      </button>
    </Tooltip>
      <Modal
        title="Account Information"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={500}
        destroyOnClose={true}
        footer={null}
        style={{ display: 'flex', flexDirection: 'column' }} // Flex layout
      >
        <AccountInfo data={data} />
        <ChangeAccount setAccount={setAccount} />
        <div style={{ marginTop: 'auto', textAlign: 'right', marginTop:'20px' }}> {/* Move to the bottom and align right */}
          <Button type="primary" onClick={() => changeAccount(props.record, account)}>Change Account</Button>
        </div>
      </Modal>
      </div>}
    </>
  );
};
export default AccountInfoModal;