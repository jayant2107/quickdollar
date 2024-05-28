import styled from "styled-components";
import "../../Style/global.css";
import { Modal } from "antd";
import { Field } from "formik";
import IntlMassage from "../../Utils/IntlMassage";
import Loader from "../Loader/Loader";
import useWindowWidth from "../CustomHook/UseWindowWidth";
import { Carousel } from "antd";
import { View } from "../../Utils/Images";

const EditDriver = ({
  handleEditCancel,
  showEditModal,
  editModal,
  viewLoader,
}) => {
  return (
    <>
      <Modal
        centered
        maskStyle={{
          backgroundColor: " rgb(0 0 0 / 70%)",
        }}
        open={editModal}
        onOk={handleEditCancel}
        onCancel={handleEditCancel}
        footer=""
        closable=""
      >
        <AddPropertyWrapper>
          {!viewLoader ? (
            <section>
              <h2>Detail's</h2>
              <div className="information">
                <div className="div1">
                  <label>Driver Name</label>
                  <h3>Lovepreet</h3>
                </div>
                <div className="div2">
                  <label>Last Name</label>
                  <h3>Singh</h3>
                </div>
                <div className="div3">
                  <label>Email</label>
                  <h3>lovepreet123@gmail.com</h3>
                </div>
                <div className="div5">
                  <label>Phone No.</label>
                  <h3>8923661029</h3>
                </div>
                <div className="div6">
                  <label>Driving permit</label>
                  <div>
                    <img src={View} alt="" />
                    <img src={View} alt="" />
                  </div>
                </div>

                <div className="div7">
                  <label>Other Identity</label>
                  <div>
                    <img src={View} alt="" />
                    <img src={View} alt="" />
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <Loader />
          )}
        </AddPropertyWrapper>
      </Modal>
    </>
  );
};
export default EditDriver;

const AddPropertyWrapper = styled.div`
  ${"" /* min-height: 150px; */}
  height: 100%;
  section {
    h2 {
      margin-top: 0px;
    }
    .information {
      line-height: 1.8;
      div {
        display: flex;
        label {
          font-size: 14px;
          font-family: ${({ theme }) => theme?.fontFamily};
          margin: 0px;
          white-space: nowrap;
        }
        h3 {
          font-size: 15px;
          color: #757575;
          font-weight: 400;
          margin: 0px;
          width: 78%;
          font-family: ${({ theme }) => theme?.fontFamily};
        }
      }
      .div4 {
        gap: 41px;
      }
      .div3 {
        gap: 78px;
      }
      .div2 {
        gap: 43px;
      }
      .div1 {
        gap: 30px;
      }
      .div5 {
        gap: 47px;
      }
      .div6 {
        display: block;
        label {
          font-size: 14px;
          font-family: ${({ theme }) => theme?.fontFamily};
          margin: 0px;
          white-space: nowrap;
          display: block;
        }
        div {
          display: flex;
          gap: 10px;

          @media (max-width: 530px) {
            overflow-y: scroll;
          }
          img {
            width: 100%;
            min-width: 220px;
            height: 180px;
            border-radius: 6px;

            @media (max-width: 982px) {
              height: 140px;
            }
            @media (max-width: 550px) {
              height: 120px;
            }
          }
        }
      }
      .div7 {
        display: block;
        label {
          font-size: 14px;
          font-family: ${({ theme }) => theme?.fontFamily};
          margin: 0px;
          white-space: nowrap;
          display: block;
          margin-top: 10px;
        }
        div {
          display: flex;
          gap: 10px;

          @media (max-width: 530px) {
            overflow-y: scroll;
          }
          img {
            width: 100%;
            min-width: 220px;
            height: 180px;
            border-radius: 6px;

            @media (max-width: 982px) {
              height: 140px;
            }
            @media (max-width: 550px) {
              height: 120px;
            }
          }
        }
      }
    }
  }
`;
