import { Outlet } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import Logo from "assets/svg/title.svg";
import { appRoutes } from "features/app/routes";

export const AuthLayout = () => {
  return (
    <Container className="d-flex flex-column">
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "200px" }}
      >
        <a href={appRoutes.home.path}>
          <Image src={Logo} style={{ height: "50px" }} />
        </a>
      </div>
      <Outlet />
    </Container>
  );
};
