import { Alert, Spinner } from "react-bootstrap";
import { ExclamationTriangleFill } from "react-bootstrap-icons";

const StatusAlert = ({
  type,
  show,
  heading = null,
  bodyText = null,
  bodyIcon = null,
}) => {
  let variant;
  switch (type) {
    case "ok":
      variant = "success";
      heading ??= "Success";
      bodyText ??= "Operation successful.";
      bodyIcon ??= <Spinner size="sm" />;
      break;
    case "fail":
      variant = "danger";
      heading ??= "Fail";
      bodyText ??= "Some error occurred.";
      bodyIcon ??= <ExclamationTriangleFill size={13} />;
      break;
    default:
      throw new Error(`unknown 'type' prop: ${type} ?`);
  }

  return (
    <Alert variant={variant} show={show}>
      <Alert.Heading>{heading}</Alert.Heading>
      <div className="d-flex">
        <span className="d-flex align-items-center">{bodyIcon}</span>
        <span className="ms-2">{bodyText}</span>
      </div>
    </Alert>
  );
};

export default StatusAlert;
