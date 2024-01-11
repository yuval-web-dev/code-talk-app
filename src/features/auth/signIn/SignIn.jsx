import { useSignIn } from "react-auth-kit";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import StatusAlert from "../common/StatusAlert";
import { PATHS } from "../common/paths";
import FormikRB from "../common/FormikRB";
import { getConfig, selectError, selectOk } from "./signInSlice";
import { fields, validationSchema, initialValues } from "./fields";

const DISCLAIMER =
  "By signing in you accept the Terms of Use and acknowledge the Privacy Statement and Cookie Policy.";

export const SignIn = () => {
  const signIn = useSignIn();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ok = useSelector(selectOk);
  const error = useSelector(selectError);

  const handleFormikSubmit = async (values, actions) => {
    try {
      const signInConfig = await dispatch(
        getConfig({
          username: values.username,
          password: values.password,
        }),
      ).unwrap();
      signInConfig.expiresIn /= 60 * 1000; // convert token lifespan from millis to minutes
      if (signIn(signInConfig)) {
        navigate(PATHS.ROOT);
      }
    } catch (err) {
      actions.resetForm();
    }
    actions.setSubmitting(false);
  };

  return (
    <Card>
      <Card.Header className="text-center fs-4">Sign in</Card.Header>
      <Card.Body>
        <FormikRB
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormikSubmit}
          fields={fields}
          submitDisclaimer={DISCLAIMER}
          submitButtonText="Login"
        />
        <StatusAlert
          type={"ok"}
          show={ok === true}
          heading={"Sign-in Successful!"}
          bodyText={"Redirecting..."}
        />
        <StatusAlert
          type={"fail"}
          show={ok === false}
          heading={"Sign-in Failed!"}
          bodyText={error?.info}
        />
      </Card.Body>

      <Card.Footer className="text-center">
        <span className="me-1">Don't have an account?</span>
        <Link reloadDocument to={PATHS.SIGN_UP}>
          Sign up here
        </Link>
      </Card.Footer>
    </Card>
  );
};

