// TableAction.js
import React from 'react';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import { CgSearch } from 'react-icons/cg';

const TableAction = ({ apply, view, edit, deleteAction, onSend, onView, onEdit, onDelete }) => {
  return (
    <div className="actionIcons">
      {apply && <IoIosSend className="icon" onClick={onSend} />}
      {view && <CgSearch className="icon" onClick={onView} />}
      {edit && <MdModeEditOutline className="icon" onClick={onEdit} />}
      {deleteAction && <MdDelete className="icon" onClick={onDelete} />}
    </div>
  );
};

export default TableAction;
