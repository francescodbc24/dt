import { FunctionComponent, PropsWithChildren } from "react";
import { Formik, FormikHelpers, FormikValues } from "formik";
interface AppFormProps {}

export interface Values {
  [field: string]: any;
}

interface AppFormProps {
  initialValues: Values;
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void | Promise<any>;
  validationSchema?: any;
  enableReinitialize?: boolean;
}

const AppForm: FunctionComponent<PropsWithChildren<AppFormProps>> = ({
  initialValues,
  onSubmit,
  validationSchema,
  enableReinitialize = true,
  children,
}) => {
  return (
    <Formik
      enableReinitialize={enableReinitialize}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props: any) => {
        return <form>{children}</form>;
      }}
    </Formik>
  );
};

export default AppForm;
