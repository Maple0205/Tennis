import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Spin } from 'antd';
import ClientProfileModal from '../ClientProfileModal';
import AccountInfoModal from '../AccountInfoModal';
import baseUrl from '../../config';
const ClientList = () => {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    getClients();
  },[]);

  const getClients = async () => {
    const res = await fetch(baseUrl + "clients", {
      method: "GET",
      headers: { 'Authorization': token }
    });
    const data = await res.json();
    if (res.status !== 200) {
      alert("Wrong connection!")
    } else {
      if (data.status !== 200) {
        alert(data.msg);
      } else {
        if (data.data.item !== null)
          setData(data.data.item.reverse());
      }
    }
    setIsLoading(false); 
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
        <ClientProfileModal text = {text}  getClients={getClients} record={record}/>
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

  const isVerticalLayout = window.innerWidth <= 500;

  const tableStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  };

  const rowStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    marginBottom: '10px',
  };

  const cellStyle = {
    padding: '10px',
    textAlign: 'left',
  };

  const pageSize = 1; // 每页显示的记录数
  const totalPages = Math.ceil(data.length / pageSize);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {isVerticalLayout ? (
           <div>
           <div style={tableStyle}>
             {data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((record) => (
               <div style={rowStyle} key={record.id}>
          <div style={cellStyle}>
            <strong>Name:</strong> {record.name}
          </div>
          <div style={cellStyle}>
            <strong>Email:</strong> {record.email}
          </div>
          <div style={cellStyle}>
            <strong>Level:</strong> {renderLevel(record)}
          </div>
          <div style={cellStyle}>
            <strong>Phone:</strong> {record.phone}
          </div>
          <div style={cellStyle}>
            <strong>Account ID:</strong> {record.aid}
          </div>  
          </div>
             ))}
           </div>
           <div>
             <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} style={{width:"40%"}}>
               Previous
             </button>
             <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} style={{width:"40%"}}>
               Next
             </button>
           </div>
         </div>
      ) : (
        isLoading ? (
          <Spin size="large"/>
        ) : (
          <Table columns={columns} dataSource={data} rowKey="id" />
        )
      )}
    </div>
  ) 
};
export default ClientList;