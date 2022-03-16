import { Alert, Button, Col, Form, InputNumber, Row, Select } from "antd";
import { useState } from "react";
import { CurrencyConvertApi } from "../../../../api/currency-converter";
import { CurrencyConverter } from "../../../../types/CurrencyConverter";
import { formItemButtonWithOutLabel, layout } from "./Layout";

const supportedCurrencies = ["EUR", "USD", "GBP", "HKD"];
type ConvertDataState = {
  convertedAmount: number;
  from: string;
  to: string;
  amount: number;
};
export const DashboardCurrencyConvert = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [convertedData, setConvertedData] = useState<null | ConvertDataState>(
    null
  );

  const [error, setError] = useState<null | boolean>(null);

  const currencyConverApi = CurrencyConvertApi();

  const handleSubmit = (values: CurrencyConverter) => {
    setLoading(true);
    setConvertedData(null);
    setError(null);
    currencyConverApi
      .convertCurrency(values)
      .then((res) => {
        console.log("res", res);
        setConvertedData({
          convertedAmount: res.convertedAmount,
          ...values,
        });
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Form
          {...layout}
          initialValues={{
            from: "USD",
            to: "EUR",
          }}
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "please enter Amout" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="from"
            label="From"
            rules={[
              {
                required: true,
                message: "please select Currency you want to convert To ",
              },
            ]}
          >
            <SelectCurrenyOptions />
          </Form.Item>
          <Form.Item
            name="to"
            label="To"
            rules={[
              {
                required: true,
                message: "please select Currency you want to convert To ",
              },
            ]}
          >
            <SelectCurrenyOptions />
          </Form.Item>
          <Form.Item {...formItemButtonWithOutLabel}>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Convert
            </Button>
          </Form.Item>
        </Form>
      </Col>
      {error ? (
        <Col span={24}>
          <Alert message="Error Occured" type="error" />
        </Col>
      ) : null}
      {convertedData ? (
        <Col span={24}>
          <h2 style={{ textAlign: "center", color: "green" }}>
            {convertedData.amount} {convertedData.from} ={" "}
            {convertedData.convertedAmount} {convertedData.to}
          </h2>
        </Col>
      ) : null}
    </Row>
  );
};

interface SelectFromToProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectCurrenyOptions = (props: SelectFromToProps) => {
  return (
    <Select {...props} placeholder="Select a Currency" allowClear>
      {supportedCurrencies.map((currency) => (
        <Select.Option key={currency} value={currency}>
          {currency}
        </Select.Option>
      ))}
    </Select>
  );
};
