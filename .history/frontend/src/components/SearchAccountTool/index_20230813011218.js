import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { Select, Spin } from 'antd';
function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
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
    />
  );
}

// Usage of DebounceSelect
async function fetchUserList(info) {
  const token = sessionStorage.getItem('token');
  if(info!==""){
    return fetch('http://localhost:5005/api/v1/account_search/'+info,{
      headers: {
        'Content-type': 'application/json',
        'Authorization': token,
      },
    })
    .then((response) => response.json())
    .then((body) => {
      console.log('response body:', body); // 添加这行
      if(body.data.item!==null){
        return body.data.item.map((account) => ({
          label: `${account.email}`,
          value: account.id,
        }));
      }else{
        return null
      }
    });
  }
}
const SearchAccountTool = (props) => {
  const [value, setValue] = useState([]);
  return (
    <DebounceSelect
      mode="single"
      value={value}
      placeholder="Select Account"
      fetchOptions={fetchUserList}
      onChange={(newValue) => {
        setValue(newValue);
        console.log('newValue:', newValue);
        props.setAccount(newValue.value);
      }}
      style={{
        width: '100%',
      }}
    />
  );
};
export default SearchAccountTool;
