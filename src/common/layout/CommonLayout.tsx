import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./CommonLayout.css";
const { Content, Footer, Sider } = Layout;

type Props = {
  children?: React.ReactNode;
};
export const CommonLayout = (props: Props) => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider breakpoint="lg">
          <h1 className="title">
            <SettingOutlined /> <span className="text">Dashboard</span>
          </h1>
          <Menu theme="dark" defaultSelectedKeys={["users"]} mode="inline">
            <Menu.Item key="users" icon={<UserOutlined />}>
              <Link to={"./users"}>Users</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content className="site-layout-content">{props.children}</Content>
          <Footer style={{ textAlign: "center" }}>
            <h3>Test</h3>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
