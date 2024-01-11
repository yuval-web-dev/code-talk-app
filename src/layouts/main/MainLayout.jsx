import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "layouts/main/Header";
import { Container } from "react-bootstrap";

export const MainLayout = () => {
  const FLUID = "md";

  return (
    <Fragment>
      <Header fluid={FLUID} />
      <Container fluid={FLUID}>
        <Outlet />
      </Container>
    </Fragment>
  );
};
