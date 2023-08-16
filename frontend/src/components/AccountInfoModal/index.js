import React, { useEffect, useState } from 'react';
import { Modal, Button, message, Tooltip, Spin } from 'antd';
import AccountInfo from '../AccountInfo';
import ChangeAccount from '../ChangeAccount';
import baseUrl from '../../config';

const AccountInfoModal = (props) => {
  const [open, setOpen] = useState(false);
  const token = sessionStorage.getItem('token');
  const [data, setData] = useState(null);
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  useEffect(() => {
    getAccountInfo(props.text);
  }, []);

  const getAccountInfo = async (aid) => {
    setIsLoading2(true);
    const res = await fetch(baseUrl+ 'account/' + aid, {
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
    setIsLoading2(false);
  }

  const changeAccount = async (values, aid) => {
    if (aid === null) {
      message.error("Please select an account!");
      return;
    }else if(aid===values.aid){
      message.error("Please select another account!");
      return;
    }
    setIsLoading(true); 
    const res = await fetch(baseUrl+"client/" + values.id, {
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
    setIsLoading(false); 
  }

  const MediaMatch = window.matchMedia('(max-width: 500px)');
  return (
    <>
    {props.text!==0 &&
    <div>
      {MediaMatch.matches ?   <div style={{ textAlign: 'left' }}>
    <button className="link-button" type="button" onClick={() => setOpen(true)}>
      {props.text}
    </button>
  </div>:<Tooltip title="View the information of this account" color='#108ee9'>
      <button className="link-button" type="button" onClick={() => setOpen(true)}>
        {props.text}
      </button>
    </Tooltip>
        }
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
        {isLoading2 ? <Spin size='large'/> : 
        <AccountInfo data={data} />}
        <ChangeAccount setAccount={setAccount} />
        <div style={{ marginTop: 'auto', textAlign: 'right', marginTop:'20px' }}> {/* Move to the bottom and align right */}
          <Button type="primary" onClick={() => changeAccount(props.record, account)} loading={isLoading}>Change Account</Button>
        </div>
      </Modal>
      </div>}
    </>
  );
};
export default AccountInfoModal;