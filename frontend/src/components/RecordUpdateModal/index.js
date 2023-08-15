import React, { useState } from 'react';
import { Modal, Tooltip } from 'antd';
import UpdateRecord from '../UpdateRecord';

const RecordUpdateModal = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip title="Click here to modify date" color="#108ee9">
      <button className="link-button" type="button" onClick={() => setOpen(true)}>
        {props.text}
      </button>
      </Tooltip>
      <Modal
        title="Modify Date"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={300}
        footer={null}
      >
          <UpdateRecord selected={props.record} setIsModalOpen1Fn={setOpen} get_records={props.get_records}/>
      </Modal>
    </>
  );
};
export default RecordUpdateModal;