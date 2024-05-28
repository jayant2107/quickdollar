import { DotChartOutlined } from "@ant-design/icons";
import { Divider, Form, Radio, Skeleton, Space, Switch } from "antd";
import { useState } from "react";

const SkeletonLoader = () => {
  return (
    <>
      <Space>
        <Skeleton.Avatar
          style={{ width: "180px", height: "180px" }}
          active={true}
          shape={"circle"}
        />
      </Space>
    </>
  );
};

export default SkeletonLoader;
