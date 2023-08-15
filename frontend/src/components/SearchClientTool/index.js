import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { Select, Spin } from 'antd';
import baseUrl from '../../config';
function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const MediaMatch = window.matchMedia('(min-width: 501px)');
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      showSearch={true}
      notFoundContent={fetching ? <Spin size="small" /> : "No match, you need to create a new one."}
      {...props}
      options={options}
      style={MediaMatch.matches ? { width: '50%' } : { width: '100%' }}
    />
  );
}

// Usage of DebounceSelect
async function fetchUserList(info) {
  const token = sessionStorage.getItem('token');
  if(info!==""){
    return fetch(baseUrl+'search_client/'+info,{
      headers: {
        'Content-type': 'application/json',
        'Authorization': token,
      },
    })
    .then((response) => response.json())
    .then((body) => {
      console.log('response body:', body); // 添加这行
      if(body.data.item!==null){
        return body.data.item.map((client) => ({
          label: `${client.email} ${client.name}`,
          key: client.id,
          value: client.name,
          title: client.aid,
        }));
      }else{
        return null
      }
    });
  }
}

const SearchClientTool = (props) => {
  const [value, setValue] = useState([]);
  
  return (
    <DebounceSelect
      mode="single"
      value={value}
      placeholder="Select Client"
      fetchOptions={fetchUserList}
      onChange={(newValue) => {
        setValue(newValue);
        console.log('newValue:', newValue);
        props.get_records(newValue.title);
        props.setClient(newValue.title);
        props.setClientName(newValue.value);
      }}
      style={{
        width: '50%',
      }}
    />
  );
};
export default SearchClientTool;
