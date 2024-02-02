import { useFormikContext } from "formik";
import { get } from "lodash";
import { FunctionComponent } from "react";
import { Form } from "react-bootstrap";

interface AppFormSelectProps {
  name: string;
  options: string[];
  readOnly?: boolean;
}

const AppFormSelect: FunctionComponent<AppFormSelectProps> = ({
  name,
  options,
  readOnly
}) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const value = get(values, name);
  return (
    <Form.Group className="m-1" controlId={name}>
      <Form.Select
      disabled={readOnly}
        value={value}
        onChange={(e) => setFieldValue(name, e.currentTarget.value, true)}
      >
        {options.map((option, index) => (
          <option key={option + index} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default AppFormSelect;
