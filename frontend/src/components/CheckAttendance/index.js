import React, {useState} from 'react'
import SearchClientTool from '../SearchClientTool'
import RecordsTable from '../RecordsTable'
import Nodata from '../Nodata'
import CreateRecordModal from '../CreateRecordModal'
import baseUrl from '../../config';
import { Spin } from 'antd';

export default function CheckAttendance() {
  const [records, setRecords] = useState(null);
  const [client, setClient] = useState(null);
  const [clientName, setClientName] = useState(null);
  const token = sessionStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);
  const get_records = async(id)=>{
    setIsLoading(true);
    console.log(id);
    const res = await fetch(baseUrl+'records/'+id,{
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': token,
      },
    })
    const data = await res.json();
    if(res.status!==200){
      alert("Wrong Connection!");
    }else{
      if(data.status!==200){
        alert(data.msg);
      }else{
        console.log(data.data);
        if (data.data.item!==null) {
          setRecords(data.data.item.reverse());
        }
      }
    }
    setIsLoading(false);
  }

  const render_records = (client,records)=>{
    if(client!==null){
      if(records!==null){
        return <><CreateRecordModal client={client} clientName={clientName} get_records={get_records}/><RecordsTable records={records} get_records={get_records}/></>
      }else{
        return <><CreateRecordModal client={client} clientName={clientName} get_records={get_records}/><Nodata/></>
      }
    }else{
      return null;
    }
  }
 
  return (
    <>
    <div style={{margin: '20px'}}>
      <SearchClientTool get_records={get_records} setClient={setClient} setClientName={setClientName}/>
    </div>
    <div>

      {isLoading ? <Spin size='large'/> : render_records(client,records)}
    </div>
    </>
  )
}
