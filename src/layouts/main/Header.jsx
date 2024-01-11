import { Container, Navbar } from "react-bootstrap";
import { House, BoxArrowLeft, Info } from "react-bootstrap-icons";
import { useIsAuthenticated } from "react-auth-kit";
import { SiteExplorer } from "features/explorers/SiteExplorer";
import { appRoutes } from "features/app/routes";
import { authRoutes } from "features/auth/routes";
import { AccountExplorer } from "features/explorers/AccountExplorer";
import { Link } from "react-router-dom";

export const Header = ({ fluid = "md" }) => {
  const isAuth = useIsAuthenticated();

  return (
    <Navbar fixed="top" sticky="top" bg="light">
      <Container fluid={fluid}>
        <SiteExplorer
          items={[
            {
              icon: <House />,
              title: "Home",
              path: appRoutes.home.path,
            },
            {
              icon: <Info />,
              title: "About",
              path: appRoutes.about.path,
            },
          ]}
        />
        {isAuth() ? (
          <AccountExplorer
            items={[
              {
                icon: <BoxArrowLeft />,
                title: "Sign out",
                path: authRoutes.signOut.path,
              },
            ]}
          />
        ) : (
          <Link to={authRoutes.signIn.path} reloadDocument>
            Sign in
          </Link>
        )}
      </Container>
    </Navbar>
  );
};
