import React, {useState, useEffect} from 'react';
import { Table } from 'antd';
import ClassTypeModal from '../ClassTypeModal';
import ModifyRate from '../ModifyRate';
  
const ClassType = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'TypeName',
      dataIndex: 'type_name',
      key: 'type_name',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      render: (text,record) => (
        <ModifyRate record = {record} getClassType={getClassType}/>)
    }
  ];
  
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem('token');
  const getClassType = async() => {
    const response = await fetch('http://localhost:5005/api/v1/class_type', {
      method: 'GET',
      headers: {  'Authorization': token },
    });
    const data = await response.json();
    if(response.status !==200){
      alert("Wrong connection!");
      return;
    }else{
      if(data.status!==200){
        alert(data.msg);
        return;
      }else{
        console.log(data.data);
        setData(data.data.item);
      }
    }
  }
  useEffect(() => {
    getClassType();
  }, []);

  return (
    <>
    <ClassTypeModal getClassType={getClassType}/> 
    <Table columns={columns} dataSource={data} rowKey='id'/>
    </>)
}
export default ClassType;