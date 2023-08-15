import React, { useState } from 'react';
import { Modal, Tooltip } from 'antd';
import ModifyRecordNote from '../ModifyRecordNote';

const ModifyRecordNoteModal = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tooltip title="Click here to modify this note" color="#108ee9">
      <button className="link-button" type="button" onClick={() => setOpen(true)}>
        {props.text}
      </button>
      </Tooltip>
      <Modal
        title="Modify Note"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
        footer={null}
      >
          <ModifyRecordNote selected={props.record} setIsModalOpen1Fn={setOpen} get_records={props.get_records}/>
      </Modal>
    </>
  );
};
export default ModifyRecordNoteModal;