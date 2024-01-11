import { Formik, Field } from "formik";
import { Form, Spinner, Button } from "react-bootstrap";

/**
 * Bridging component between [Formik](https://formik.org/docs/overview) 
 and [React Bootstrap](https://react-bootstrap.netlify.app/).
 * @see {@link https://codesandbox.io/s/react-bootstrap-formik-pb831}
 * @param {*} param0 
 * @returns 
 */
const FormikRB = ({
  initialValues,
  validationSchema,
  fields,
  onSubmit,
  submitDisclaimer,
  submitButtonText,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({
      handleSubmit,
      isSubmitting,
      errors,
      submitCount,
      values,
      initialValues,
    }) => (
      // https://formik.org/docs/api/formik#props-1
      <Form noValidate onSubmit={handleSubmit}>
        {Object.entries(fields).map(([fieldName, fieldObj], idx) => (
          <Field key={idx} name={fieldName}>
            {({ field }) => (
              <Form.Group className="my-2">
                <Form.Label className="my-0">
                  {fieldObj.label}
                  {fieldObj.required ? (
                    <span className="text-danger"> *</span>
                  ) : null}
                </Form.Label>
                <Form.Control
                  {...field}
                  type={fieldObj.type}
                  isValid={
                    fieldObj.validFeedback &&
                    !errors[fieldName] &&
                    submitCount > 0 &&
                    values[fieldName] !== initialValues[fieldName]
                  }
                  isInvalid={errors[fieldName] && submitCount > 0}
                  feedback={errors[fieldName]}
                ></Form.Control>

                <Form.Control.Feedback type="invalid">
                  {errors[fieldName]}
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Field>
        ))}
        <Form.Group className="mt-3 mb-1">
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner size="sm" /> : submitButtonText}
          </Button>
          <Form.Text>{submitDisclaimer}</Form.Text>
        </Form.Group>
      </Form>
    )}
  </Formik>
);

export default FormikRB;
