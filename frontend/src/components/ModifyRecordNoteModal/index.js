import React, { useState } from 'react';
import { Modal, Tooltip } from 'antd';
import ModifyRecordNote from '../ModifyRecordNote';
import { ReactComponent as LogoSvg } from "../../images/add-circle-outline.svg"
const ModifyRecordNoteModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleText = (text) => {
    console.log(text);
    if(text===""){
      return <LogoSvg width="20" height="20" style={{ fill: "rgb(2, 162, 236)" }}/>
    }
    return text;
  }

  return (
    <>
      <Tooltip title="Click here to modify this note" color="#108ee9">
      <button className="link-button" type="button" onClick={() => setOpen(true)}>
        {handleText(props.text)}
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