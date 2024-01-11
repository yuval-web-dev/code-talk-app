import { Offcanvas, ListGroup } from "react-bootstrap";

const RBOffcanvas = ({
  items,
  header,
  footerContent,
  show,
  onHide,
  placement = "start",
}) => {
  return (
    <Offcanvas show={show} onHide={onHide} placement={placement}>
      <Offcanvas.Header className="p-0">{header}</Offcanvas.Header>
      <Offcanvas.Body className="p-0">
        <ListGroup>
          {items?.map(({ title, icon, path }, idx) => (
            <ListGroup.Item
              key={idx}
              action
              href={path}
              className="d-flex flex-row align-items-center"
            >
              <div className="me-2">{icon}</div>
              <div>{title}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default RBOffcanvas;
