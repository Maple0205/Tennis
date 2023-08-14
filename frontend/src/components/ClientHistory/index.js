import React from 'react';
import { Table } from 'antd';
import Nodata from '../Nodata';
const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Class Type',
    dataIndex: 'class_type',
    key: 'class_type',
  },
  {
    title: 'Period',
    dataIndex: 'period',
    key: 'period',
  },
  {
    title: 'Hours',
    dataIndex: 'hours',
    key: 'hours',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'Fee',
    dataIndex: 'fee',
    key: 'fee',
  },
  {
    title: 'Recharge',
    dataIndex: 'recharge',
    key: 'recharge',
  },
  {
    title: 'Bonus',
    dataIndex: 'bonus',
    key: 'bonus',
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
  },
];
const data = [
];
const ClientHistory = () => {
  if(data.isArray && data.length>0){
    return <Table columns={columns} dataSource={data} />;
  }
  else{
    return <Nodata/>
  }
}
export default ClientHistory;