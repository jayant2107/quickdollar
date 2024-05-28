import React, { useState } from "react";
import { ActionBox, Delete, Edit, Unlink, View } from "../Styles";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import { BsEyeFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const TableActions = ({
  Data,
  Action,
  id,
  showEditModal,
  valId,
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();

  const viewDetail = () => {
    navigate(Action.pathname, (id = { id }));
  };
  const editDetail = () => {
    navigate(Action.pathnameEdit, (id = { id }));
  };
  const openModal = () => {
    setOpenDelete(true);
  };
  const closeModal = () => {
    setOpenDelete(false);
  };
  return (
    <ActionBox>
      <DeleteModal
      //   handleConfirm={() => del()}
      //   show={openDelete}
      //   onHide={closeModal}
      />

      {Action.view && !Action.openModal && (
        <BsEyeFill
          onClick={() => {
            showEditModal();
          }}
          className="tableUlIcon"
        />
      )}
      {Action.view && Action.openModal && (
        <BsEyeFill onClick={() => showEditModal()} className="tableUlIcon" />
      )}

      {Action.edit && Data.is_expired === 1 ? (
        <MdModeEditOutline
          style={{ color: "grey", opacity: "0.6" }}
          className="tableUlIcon1"
        />
      ) : (
        Action.edit && (
          <MdModeEditOutline onClick={editDetail} className="tableUlIcon1" />
        )
      )}
      {Action.delete && (
        <MdDelete onClick={openModal} className="tableUlIcon2" />
      )}
      {Action.unlink && <Unlink>Unlink</Unlink>}
    </ActionBox>
  );
};

export default TableActions;
