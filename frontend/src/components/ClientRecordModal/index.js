import React, { useState } from 'react';
import { Modal, Tooltip } from 'antd';
import UpdateClient from '../UpdateClient';
import './style.css'
const ClientRecordModal = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip title="Click here to update this profile" color="#108ee9">
      <button className="link-button" type="button" onClick={() => setOpen(true)}>
        {props.text}
      </button>
      </Tooltip>
      <Modal
        title="Update Profile"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={750}
        footer={null}
      >
          <UpdateClient selected={props.record} setIsModalOpen1Fn={setOpen} getClients={props.getClients}/>
      </Modal>
    </>
  );
};
export default ClientRecordModal;