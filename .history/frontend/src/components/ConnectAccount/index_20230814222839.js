import React, { useState } from 'react';
import { Modal } from 'antd';
import logo from '../../images/add-circle-outline.svg';
import SearchAccountTool from '../SearchAccountTool';
import baseUrl from '../../config';
const ConnectAccount = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [account, setAccount] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    update_client(props.client, account);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const update_client=async(values,account)=>{
    const token = sessionStorage.getItem('token');
    const res = await fetch(baseUrl+"client/"+values.id,{
      method: "PUT",
      headers: {
        'accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        level:values.level,
        email: values.email,
        name: values.name,
        phone: values.phone,
        aid: parseInt(account)
      })
    })
    const data = await res.json();
    if(res.status===200){
      if(data.status!==200){
        alert(data.msg);
      }else{
        alert("Succeed!");
        props.getClients();
        setIsModalOpen(false);
      }
    }else{
      alert("Wrong connection!");
    }
  }
  return (
    <>
      <div style={{ display: 'flex', height: '40px'}}>
        <img src={logo} alt="add" style={{width:'25px'}}  onClick={showModal}/>
      </div>
      <Modal title="Accounts" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true} okText="Connect" cancelText="New Account">
        <SearchAccountTool setAccount={setAccount}/>
      </Modal>
    </>
  );
};
export default ConnectAccount;