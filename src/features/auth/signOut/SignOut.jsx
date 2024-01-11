import { useEffect } from "react";
import { useAuthHeader, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { PATHS } from "../common/paths";
import { selectOk, requestSignOut } from "./signOutSlice";

export const SignOut = () => {
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  const signOut = useSignOut();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ok = useSelector(selectOk);

  useEffect(() => {
    dispatch(requestSignOut({ bearerToken: authHeader() }));
    if (ok) {
      navigate(PATHS.ROOT);
    }
  }, []);

  if (!isAuthenticated() || ok === true) {
    return <Navigate to={PATHS.ROOT} />;
  } else {
    return <Spinner />;
  }
};
