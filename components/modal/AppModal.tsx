import { PropsWithChildren } from "react";
import { Modal } from "react-bootstrap";
import { modalType } from "@/types";

interface Props extends modalType {
  children: PropsWithChildren<any>;
  header: JSX.Element;
}

export default function AppModal({ show, onHide, children, header }: Props) {
  return (
    <Modal show={show} onHide={onHide} role="dialog">
      <Modal.Header className="bg-secondary" closeButton>
        {header}
      </Modal.Header>
      <Modal.Body className="tab-content py-4">{children}</Modal.Body>
    </Modal>
  );
}
