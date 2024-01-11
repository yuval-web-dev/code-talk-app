import { Fragment, useState } from "react";
import { Image, Navbar } from "react-bootstrap";
import RBOffcanvas from "./RBOffcanvas";
import Avatar from "assets/png/avatar.png";
import { useAuthUser } from "react-auth-kit";

export const AccountExplorer = ({ items }) => {
  const [show, setShow] = useState(false);
  const authUser = useAuthUser();

  return (
    <Fragment>
      <Image
        src={Avatar}
        thumbnail
        onClick={() => setShow(true)}
        roundedCircle={true}
        style={{ height: "50px", cursor: "pointer" }}
      />
      <RBOffcanvas
        items={items}
        header={
          <Navbar className="mx-3">
            <Navbar.Brand>{authUser().username}</Navbar.Brand>
          </Navbar>
        }
        show={show}
        onHide={() => setShow(false)}
        placement={"end"}
      />
    </Fragment>
  );
};
