import { Alert, Button, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import useAuth from "../../../../common/hooks/useAuth";

type Props = {} & RouteComponentProps;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { md: { offset: 8, span: 8 } },
};

export const AuthenticationSignIn = (props: Props) => {
  const { loading, login, error } = useAuth();
  const onFinish = (values: any) => {
    login(values.email, values.password);
  };

  return (
    <Row className="authentication-sign-in default-padding">
      <Col span={24}>
        <h2> Currency Converter App Login</h2>
      </Col>
      <Col span={24} className="login-wrapper">
        <Form
          layout="horizontal"
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          labelAlign="right"
          size="large"
        >
          <Form.Item
            label={"Email"}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"Password"}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>{"Remember me"}</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button loading={loading} type="primary" htmlType="submit">
              {"Login"}
            </Button>
          </Form.Item>
        </Form>
      </Col>
      {error ? (
        <Col span={24}>
          <Row justify="center">
            <Alert type={"error"} message={"Please verify your Credentials"} />
          </Row>
        </Col>
      ) : null}
    </Row>
  );
};
