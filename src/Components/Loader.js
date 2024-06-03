import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styled from "styled-components";
const Loader = ({ size }) => (
  <LoadingBox>
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: size,
          }}
          spin
        />
      }
    />
  </LoadingBox>
);
export default Loader;

const LoadingBox = styled.div`
  width: 100%;
  min-height: 300px;
  display: grid;
  place-items: center;
`;
