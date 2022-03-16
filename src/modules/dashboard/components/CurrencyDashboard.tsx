import { Row, Col } from "antd";
import useAuth from "../../../common/hooks/useAuth";
import { DashboardCurrencyConvert } from "./currency-converter";

export const CurrencyDashboard = () => {
  const { user } = useAuth();

  return (
    <Row>
      <Col span={24}>
        <h3>
          My Name is {user?.Name} Please Enter your desired currency exchange
        </h3>
      </Col>
      <Col span={24}>
        <DashboardCurrencyConvert />
      </Col>
    </Row>
  );
};
