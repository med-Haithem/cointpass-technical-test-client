import { Col } from "antd";

type Props = {
  convertedAmount: number;
  from: string;
  to: string;
  amount: number;
};

export const DashbordConversionResult = ({
  amount,
  convertedAmount,
  from,
  to,
}: Props) => {
  return (
    <Col span={24}>
      <h2 style={{ textAlign: "center", color: "green" }}>
        {amount} {from} = {convertedAmount} {to}
      </h2>
    </Col>
  );
};
