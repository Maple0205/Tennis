import React, { useState } from 'react';
import { Table } from 'antd';
import './style.css'
const columns = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
];

const ClientModalList = (props) => {
  const [selectedRowId, setSelectedRowId] = useState(null);

  const onRow = (record) => {
    return {
      onClick: () => {
        props.onRowClick(record.id);
        setSelectedRowId(record.id);
      },
      className: selectedRowId === record.id ? 'selected-row' : '',
    };
  };

  return (
    <Table
      columns={columns}
      dataSource={props.clients}
      onRow={onRow}
      rowClassName="table-row"
    />
  );
};

export default ClientModalList;
