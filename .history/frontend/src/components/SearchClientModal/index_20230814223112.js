import React, {useState} from 'react';
import { Modal } from 'antd';
import { Input, Space } from 'antd';
import Nodata from '../Nodata';
import ClientModalList from '../ClientModalList';
import UpdateClient from '../UpdateClient';
import baseUrl from '../../config';
const { Search } = Input;

const SearchClientModal = () => {
  const [clients, setClients] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if(selected!==null){
      showModal1();
    }
    else{
      alert("You haven't choose a client!");
    }
    
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelected(null);
  };

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const onSearch = async(value) => {
    if (value !== "") {
    const token = sessionStorage.getItem('token');
    const response = await fetch(baseUrl+'search_client/'+value, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token,
      },
    });
    const data = await response.json();
    if (data.status !== 200) {
      alert(data.msg);
    } else {
      setClients(data.data.item);
      showModal();
    }}
  };

  const handleRowClick = (id) => {
    const selectedObject = clients.find(client => client.id === id);
    setSelected(selectedObject);
  };

  return (
    <>
      <Space direction="vertical">
        <Search
          placeholder="input name or email"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Space>
      <Modal title="Client Information" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width='1000px' destroyOnClose={true} okText="Update">
        { Array.isArray(clients) && clients.length>0 ? 
        <ClientModalList clients={clients} onRowClick={handleRowClick}/>:<Nodata/>
        }
      </Modal>
      <Modal title="Update Client Information" open={isModalOpen1} onOk={handleOk1} onCancel={handleCancel1} width='500px' destroyOnClose={true} okText="Submit" footer={null}>
      <UpdateClient selected={selected} setIsModalOpen1Fn={setIsModalOpen1}/>
      </Modal>
    </>
)}
export default SearchClientModal;