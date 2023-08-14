import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';

const RecordsTable = (props) => {
  const data = props.records;
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Class Type',
      dataIndex: 'class_type',
      key: 'class_type',
      ...getColumnSearchProps('class_type'),
      render : (text) => {
        if(text==="1"){
          return "Single";
        }else if(text==="2"){
          return "2 people";
        }else if(text==="3"){
          return "3 people";
        }else if(text==="4"){
          return "4 people";
        }else if (text==="5"){
          return "5 people";
        }else{
          return null;
        }
      }
    },
    {
      title: 'Start Time',
      dataIndex: 'start_time',
      key: 'start_time',
      ...getColumnSearchProps('start_time'),
    },
    {
      title: 'End Time',
      dataIndex: 'end_time',
      key: 'end_time',
      ...getColumnSearchProps('end_time'),
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
      ...getColumnSearchProps('hours'),
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      ...getColumnSearchProps('rate'),
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
      ...getColumnSearchProps('fee'),
    },
    {
      title: 'Deposit',
      dataIndex: 'recharge',
      key: 'recharge',
      ...getColumnSearchProps('recharge'),
    },
    {
      title: 'Complimentary',
      dataIndex: 'bonus',
      key: 'bonus',
      ...getColumnSearchProps('bonus'),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      ...getColumnSearchProps('balance'),
    },
    {
      title: 'Account ID',
      dataIndex: 'account_id',
      key: 'account_id',
      ...getColumnSearchProps('account_id'),
    },
    {
      title: 'Note',
      dataIndex: 'remark',
      key: 'remark',
      ...getColumnSearchProps('remark'),
    }
  ];
  return <Table columns={columns} dataSource={data}  rowKey="id"/>;
};
export default RecordsTable;