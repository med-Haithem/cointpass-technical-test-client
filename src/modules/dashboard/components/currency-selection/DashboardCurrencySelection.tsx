import { Select } from "antd";
const supportedCurrencies = ["EUR", "USD", "GBP", "HKD"];

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

export const SelectCurrenyOptions = (props: Props) => {
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
