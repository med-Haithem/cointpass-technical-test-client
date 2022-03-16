import { Alert, Button, Col, Form, InputNumber, Row } from "antd";
import { useState } from "react";
import { CurrencyConvertApi } from "../../../../api/currency-converter";
import { CurrencyConverter } from "../../../../types/CurrencyConverter";
import { DashbordConversionResult } from "../conversion-result";
import { SelectCurrenyOptions } from "../currency-selection";
import { formItemButtonWithOutLabel, layout } from "./Layout";

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
    if (values.from === values.to) {
      setConvertedData({
        convertedAmount: values.amount,
        ...values,
      });
      return;
    }
    setLoading(true);
    setConvertedData(null);
    setError(null);
    currencyConverApi
      .convertCurrency(values)
      .then((res) => {
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
      {convertedData ? <DashbordConversionResult {...convertedData} /> : null}
    </Row>
  );
};
