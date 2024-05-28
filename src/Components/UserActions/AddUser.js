import styled from "styled-components";
import "../../Style/global.css";
import { Modal } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import IntlMassage from "../../Utils/IntlMassage";

const AddUser = ({ handleAddUserCancel, showAddUserModal, addUserModal }) => {
  const initialValues = {
    userName: "",
    address: "",
    locationLink: "",
    units: "",
  };

  const validateSchema = yup.object().shape({
    userName: yup.string().required("Please enter driver name"),
    address: yup.string().required("Please enter address"),
    locationLink: yup.string().required("Please enter a link"),
    units: yup.number().required("Please enter units"),
  });

  const handleSubmit = (value) => {
    console.log(value, "value--");
  };
  return (
    <>
      <Modal
        centered
        maskStyle={{
          backgroundColor: " rgb(0 0 0 / 70%)",
        }}
        open={addUserModal}
        onOk={handleAddUserCancel}
        onCancel={handleAddUserCancel}
        footer=""
        closable=""
      >
        <AddPropertyWrapper>
          <div className="header">
            <h2>
              <IntlMassage id="adduser.heading" />
            </h2>
          </div>
          <div className="formDiv">
            <Formik
              onSubmit={handleSubmit}
              initialValues={initialValues}
              validationSchema={validateSchema}
            >
              <Form className="form">
                <div className="addInputs">
                  <div className="addInputDiv">
                    <label>
                      <IntlMassage id="table.username" />
                    </label>
                    <Field type="text" name="userName"></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="userName" />
                    </div>
                  </div>
                  <div className="addInputDiv">
                    <label>
                      <IntlMassage id="table.address" />
                    </label>
                    <Field type="text" name="address"></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="address" />
                    </div>
                  </div>
                  <div className="addInputDiv">
                    <label>
                      <IntlMassage id="table.locationlink" />
                    </label>
                    <Field type="text" name="locationLink"></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="locationLink" />
                    </div>
                  </div>
                  <div className="addInputDiv">
                    <label>
                      <IntlMassage id="table.username" />
                    </label>
                    <Field type="text" name="units"></Field>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="units" />
                    </div>
                  </div>
                </div>
                <div className="submit-btn">
                  <button type="submit">SUBMIT</button>
                </div>
              </Form>
            </Formik>
          </div>
        </AddPropertyWrapper>
      </Modal>
    </>
  );
};
export default AddUser;

const AddPropertyWrapper = styled.div`
  .buttonload {
    background: rgb(105, 201, 102);
    border: none;
    color: #fff;
    font-size: 15px;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  .fa {
    margin-left: -12px;
    margin-right: 8px;
  }
  .header {
    h2 {
      text-align: center;
      font-family: ${({ theme }) => theme?.fontFamily};
    }
  }
  .formDiv {
    .form {
      .addInputs {
        .addInputDiv {
          label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            font-family: ${({ theme }) => theme?.fontFamily};
          }
          input {
            font-size: 13px;
            color: ${({ theme }) => theme?.inputColor};
            padding: 10px;
            width: 95.5%;
            background: ${({ theme }) => theme?.inputBg};
            border: 1px solid #e1e1e1;
            border-radius: 6px;
            margin-bottom: 12px;
            margin-top: 3px;
            font-family: ${({ theme }) => theme?.fontFamily};

            :focus {
              outline: none;
            }
          }
        }
      }
    }
  }

  .submit-btn {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button {
      background: ${({ theme }) => theme?.secondaryColor};
      border: none;
      color: ${({ theme }) => theme?.primaryColor};
      font-size: 15px;
      padding: 10px 20px;
      font-weight: 600;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;
