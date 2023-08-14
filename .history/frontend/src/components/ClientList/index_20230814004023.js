import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';
import ClientRecordModal from '../ClientRecordModal';
import AccountInfoModal from '../AccountInfoModal';
const ClientList = () => {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem('token');
  
  useEffect(()=>{
    getClients();
  },[]);

  const getClients =async()=>{
    const res = await fetch("http://localhost:5005/api/v1/clients", {
      method: "GET",
      headers: {'Authorization': token}
    })
    const data = await res.json();
    if(res.status!==200){
      alert("Wrong connection!")
    }else{
      if(data.status!==200){
        alert(data.msg);
      }else{
        // console.log(data.data.item);
        if(data.data.item!==null )
          setData(data.data.item.reverse());
      }
    }
  }
  
  const renderLevel = (record) => {
    if (record.level === 1) {
      return <span>Primary</span>;
    } else if (record.level === 2) {
      return <span>Middle</span>;
    } else if (record.level === 3) {
      return <span>Advanced</span>;
    }
  };

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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
      render: (text,record) => (
        <ClientRecordModal text = {text}  getClients={getClients} record={record}/>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: '20%',
      ...getColumnSearchProps('level'),
      sorter: (a, b) => a.level - b.level,
      sortDirections: ['descend', 'ascend'],
      render: (text,record) => renderLevel(record),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Account ID',
      dataIndex: 'aid',
      key: 'aid',
      ...getColumnSearchProps('aid'),
      sorter: (a, b) => a.aid - b.aid,
      sortDirections: ['descend', 'ascend'],
      render: (text,record) => (
        <AccountInfoModal text = {text} record={record} getClients={getClients}/>
      ),
    }
  ];
  return <Table columns={columns} dataSource={data} rowKey="id"/>
};
export default ClientList;