import * as Yup from "yup";
import { reshapeByKey } from "../common/helpers";

const REQUIRED_FEEDBACK = "This field is required.";

export const fields = {
  username: {
    validFeedback: false,
    label: "Username",
    type: "text",
    init: "",
    valid: Yup.string().required(REQUIRED_FEEDBACK),
  },
  password: {
    validFeedback: false,
    label: "Password",
    type: "password",
    init: "",
    valid: Yup.string().required(REQUIRED_FEEDBACK),
  },
};

export const initialValues = reshapeByKey(fields, "init");

export const validationSchema = Yup.object(reshapeByKey(fields, "valid"));
