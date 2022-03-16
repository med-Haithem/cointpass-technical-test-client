import React from "react";
import { Layout, Menu } from "antd";
import { UndoOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./CommonLayout.css";
import useAuth from "../hooks/useAuth";
const { Content, Footer, Sider } = Layout;

type Props = {
  children?: React.ReactNode;
};
export const CommonLayout = (props: Props) => {
  const { user } = useAuth();
  const isAuthenticated = user ? true : false;
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {isAuthenticated ? (
          <Sider breakpoint="lg">
            <h1 className="title">
              <SettingOutlined /> <span className="text">Dashboard</span>
            </h1>
            <Menu
              theme="dark"
              defaultSelectedKeys={["dashboard"]}
              mode="inline"
            >
              <Menu.Item key="dashboard" icon={<UndoOutlined />}>
                <Link to={"./dashboard"}>Currency Exchange</Link>
              </Menu.Item>
            </Menu>
          </Sider>
        ) : null}
        <Layout>
          <Content className="site-layout-content">{props.children}</Content>
          <Footer style={{ textAlign: "center" }}>
            <h3>Coinpass Technical Test</h3>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};
