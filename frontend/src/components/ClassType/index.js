import React, {useState, useEffect} from 'react';
import { Table, Spin } from 'antd';
import ClassTypeModal from '../ClassTypeModal';
import ModifyRate from '../ModifyRate';
import baseUrl from '../../config';
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
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem('token');
  const getClassType = async() => {
    setIsLoading(true);
    const response = await fetch(baseUrl+'class_type', {
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
    setIsLoading(false);
  }
  useEffect(() => {
    getClassType();
  }, []);

  return (
    <>
    <ClassTypeModal getClassType={getClassType}/> 
    {isLoading ? <Spin size='large'/> :
    <Table columns={columns} dataSource={data} rowKey='id'/>}
    </>)
}
export default ClassType;