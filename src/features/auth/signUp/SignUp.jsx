import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import StatusAlert from "../common/StatusAlert";
import { PATHS } from "../common/paths";
import FormikRB from "../common/FormikRB";
import { fields, initialValues, validationSchema } from "./fields";
import { createAccount, selectError, selectOk } from "./signUpSlice";

const DISCLAIMER =
  "By creating an account you accept the Terms of Use and acknowledge the Privacy Statement and Cookie Policy.";

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ok = useSelector(selectOk);
  const error = useSelector(selectError);

  useEffect(() => {
    if (ok) {
      setTimeout(() => {
        navigate(PATHS.SIGN_IN);
      }, 1000);
    }
  }, [ok, navigate]);

  const handleFormikSubmit = async (values, actions) => {
    try {
      await dispatch(
        createAccount({
          username: values.username,
          password: values.password,
          email: values.email,
        }),
      ).unwrap();
    } catch (err) {
      actions.resetForm();
    }
    actions.setSubmitting(false);
  };

  return (
    <Card>
      <Card.Header className="text-center fs-4">Sign up</Card.Header>
      <Card.Body>
        <FormikRB
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormikSubmit}
          fields={fields}
          submitButtonText={"Register"}
          submitDisclaimer={DISCLAIMER}
        />
        <StatusAlert
          type={"ok"}
          show={ok === true}
          heading={"Sign-up Successful!"}
          bodyText={"Redirecting..."}
        />
        <StatusAlert
          type={"fail"}
          show={ok === false}
          heading={"Sign-up Failed!"}
          bodyText={error?.info}
        />
      </Card.Body>

      <Card.Footer className="text-center">
        <span className="me-1">Already have an account?</span>
        <Link reloadDocument to={PATHS.SIGN_IN}>
          Sign in here
        </Link>
      </Card.Footer>
    </Card>
  );
};
