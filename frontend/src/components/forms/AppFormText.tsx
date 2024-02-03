import { useFormikContext } from "formik";
import { FunctionComponent } from "react";
import { Form } from "react-bootstrap";
import { get } from "lodash";
interface FormTextProps {
  name: string;
  placeholder: string;
  readOnly?: boolean;
}

const AppFormText: FunctionComponent<FormTextProps> = ({
  name,
  placeholder,
  readOnly = false,
}) => {
  const { errors, values, setFieldValue } = useFormikContext<any>();
  const error = get(errors, name);
  const value = get(values, name);
  return (
    <Form.Group className="m-1" controlId={name}>
      <Form.Control
        readOnly={readOnly}
        type={"text"}
        step={"any"}
        placeholder={placeholder}
        value={value ? value : ""}
        isInvalid={error ? true : false}
        onChange={(e) => {
          const value = e.currentTarget.value;
          setFieldValue(name, value, true);
        }}
      />
      <Form.Text className="text-danger">{error && error as String}</Form.Text>
    </Form.Group>
  );
};

export default AppFormText;
