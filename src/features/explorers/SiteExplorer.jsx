import { Fragment, useState } from "react";
import { Button, Image, Navbar } from "react-bootstrap";
import RBOffcanvas from "./RBOffcanvas";
import { List } from "react-bootstrap-icons";
import BlogLogo from "assets/svg/title.svg";

export const SiteExplorer = ({ items }) => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Button
        variant="light"
        onClick={() => setShow(true)}
        className="border border-1 rounded-circle d-flex justify-content-center align-items-center p-0"
        style={{ height: 60, width: 60 }}
      >
        <List size={35} />
      </Button>
      <RBOffcanvas
        items={items}
        header={
          <Navbar className="w-100" bg="light">
            <Navbar.Brand className="ms-3">
              <Image src={BlogLogo} style={{ height: "25px" }} />
            </Navbar.Brand>
          </Navbar>
        }
        show={show}
        onHide={() => setShow(false)}
      />
    </Fragment>
  );
};
