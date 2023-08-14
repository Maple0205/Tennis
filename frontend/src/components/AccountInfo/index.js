import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Property',
    dataIndex: 'property',
    key: 'property',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];

const AccountInfo = ({ data }) => {
  const dataSource = [
    {
      key: '1',
      property: 'Account ID',
      value: data ? data.id : null,
    },
    {
      key: '2',
      property: 'Email',
      value: data ? data.email : null,
    },
    {
      key: '3',
      property: 'Balance',
      value: data ? data.balance : null,
    },
    // Add more rows for additional properties if needed
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="middle"
      bordered
      style={{ marginBottom: '20px', marginTop: '20px' }}
    />
  );
};

export default AccountInfo;
