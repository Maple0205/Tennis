import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';
import RecordUpdateModal from '../RecordUpdateModal';
import ModifyRecordNoteModal from '../ModifyRecordNoteModal';
import { Cell, CellGroup,Pagination } from 'react-vant'
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
      sorter: (a, b) => new Date(a.date) - new Date(b.date), // Ensure the date values can be compared
      sortDirections: ['descend', 'ascend'],
      render: (text,record) => {
        return <RecordUpdateModal record={record} get_records={props.get_records} text={text}/>},
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
          return "2 People";
        }else if(text==="3"){
          return "3 People";
        }else if(text==="4"){
          return "4 People";
        }else if (text==="5"){
          return "5 People";
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
      render: (text,record) => {
        return <ModifyRecordNoteModal record={record} get_records={props.get_records} text={text}/>},
    }
  ];

  const isVerticalLayout = window.innerWidth <= 500;
  const pageSize = 1; // 每页显示的记录数
  const totalPages = Math.ceil(data.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <div>
      {isVerticalLayout ? (
        data.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((record,index) => (
          <div key={index}>
          <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
          <CellGroup>
          <Cell title={<div style={{ textAlign: 'left' }}>Date</div>} value={<RecordUpdateModal record={record} get_records={props.get_records} text={record.date}/>} />
          <Cell title={<div style={{ textAlign: 'left' }}>Name</div>} value={<div style={{ textAlign: 'left' }}>{record.name}</div>} />
          <Cell title={<div style={{ textAlign: 'left' }}>Class Type</div>} value={<div style={{ textAlign: 'left' }}>{record.class_type}</div>} />
          <Cell title={<div style={{ textAlign: 'left' }}>Start Time</div>} value={<div style={{ textAlign: 'left' }}>{record.start_time}</div>} />
          <Cell title={<div style={{ textAlign: 'left' }}>End Time</div>} value={<div style={{ textAlign: 'left' }}>{record.end_time}</div>} />
          <Cell title={<div style={{ textAlign: 'left' }}>Hours</div>} value={<div style={{ textAlign: 'left' }}>{record.hours}</div>} />
          <Cell title={<div style={{ textAlign: 'left' }}>Rate</div>} value={<div style={{ textAlign: 'left' }}>{record.rate}</div>} />
          <Cell title={<div style={{ textAlign: 'left' }}>Fee</div>} value={<div style={{ textAlign: 'left' }}>{record.fee}</div>} />
          <Cell title={<div style={{ textAlign: 'left' }}>Deposit</div>} value={<div style={{ textAlign: 'left' }}>{record.recharge}</div>} />
          <Cell title={<div style={{ textAlign: 'left' }}>Complimentary</div>} value={<div style={{ textAlign: 'left' }}>{record.bonus}</div>} />
          <Cell title={<div style={{ textAlign: 'left' }}>Balance</div>} value={<div style={{ textAlign: 'left' }}>{record.balance}</div>} />
          <Cell title={<div style={{ textAlign: 'left' }}>Account ID</div>} value={<div style={{ textAlign: 'left' }}>{record.account_id}</div>} />
          <Cell title={<div style={{ textAlign: 'left' }}>Note</div>} value={<ModifyRecordNoteModal record={record} get_records={props.get_records} text={record.remark}/>} />
          </CellGroup>
          </div>
          <div style={{textAlign:'center'}}>
          <Pagination value={currentPage} mode="simple" onChange={setCurrentPage} pageCount={totalPages}       prevText="Previous"
          nextText="Next"
          />
          </div>
          </div>))
      ) : (
        <Table columns={columns} dataSource={data} rowKey="id" pagination={false} />
      )}
    </div>
  ) 
  
};
export default RecordsTable;