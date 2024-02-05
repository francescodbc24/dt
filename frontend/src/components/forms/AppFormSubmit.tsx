import { useFormikContext } from "formik";
import { FunctionComponent } from "react";
import { Button, ButtonProps } from "react-bootstrap";
import { MdSearch } from "react-icons/md";
interface FormSubmitProps extends ButtonProps {}

const AppFormSubmit: FunctionComponent<FormSubmitProps> = ({}) => {
  const { handleSubmit } = useFormikContext();
  return (
    <Button data-testid="button-analyse" className="m-1" onClick={() => handleSubmit()}>
      <MdSearch size={"1.4rem"} />
    </Button>
  );
};

export default AppFormSubmit;
