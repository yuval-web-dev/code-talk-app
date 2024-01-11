import * as Yup from "yup";
import { reshapeByKey } from "../common/helpers";

const REQUIRED_FEEDBACK = "This field is required.";
const USERNAME = {
  MIN: 6,
  MAX: 20,
  REGEX: RegExp(/^[a-zA-Z][a-zA-Z0-9_]+$/),
};
const PASSWORD = {
  MIN: 10,
  MAX: 30,
  REGEX: RegExp(/^[a-zA-Z0-9!@#$%^&*()]+$/),
};

export const fields = {
  username: {
    required: true,
    label: "Username",
    type: "text",
    init: "",
    valid: Yup.string()
      .required(REQUIRED_FEEDBACK)
      .matches(USERNAME.REGEX, `Use only allowed characters: "a-z", "A-Z", "0-9", "_".`)
      .min(USERNAME.MIN, `Minimum length: ${USERNAME.MIN} characters.`)
      .max(USERNAME.MAX, `Maximum length: ${USERNAME.MAX} characters.`),
  },
  password: {
    required: true,
    label: "Password",
    type: "password",
    init: "",
    valid: Yup.string()
      .required(REQUIRED_FEEDBACK)
      .matches(
        USERNAME.REGEX,
        `Use only allowed characters: "a-z", "A-Z", number row ("0-9", "!", "@", "#", etc.)`,
      )
      .notOneOf(
        [Yup.ref("username"), Yup.ref("email"), null],
        "Password can't contain your username or E-mail address.",
      )
      .min(PASSWORD.MIN, `Minimum length: ${PASSWORD.MIN} characters.`)
      .max(PASSWORD.MAX, `Maximum length: ${PASSWORD.MAX} characters.`),
  },
  repeatPassword: {
    required: true,
    label: "Repeat Password",
    type: "password",
    init: "",
    valid: Yup.string()
      .required(REQUIRED_FEEDBACK)
      .oneOf([Yup.ref("password"), null], "Passwords don't match.")
      .matches(
        USERNAME.REGEX,
        `Allowed characters: a-z, A-Z, number row (0-9, !, @, #...)`,
      )
      .notOneOf(
        [Yup.ref("username"), Yup.ref("email")],
        "Password can't contain your username or E-mail address.",
      )
      .min(PASSWORD.MIN, `Minimum length: ${PASSWORD.MIN} characters.`)
      .max(PASSWORD.MAX, `Maximum length: ${PASSWORD.MAX} characters.`),
  },
  email: {
    required: false,
    label: "E-mail Address",
    type: "email",
    init: "",
    valid: Yup.string().email("Invalid E-mail address."),
  },
};
export const initialValues = reshapeByKey(fields, "init");
export const validationSchema = Yup.object(reshapeByKey(fields, "valid"));
