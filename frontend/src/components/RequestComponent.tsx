import { FunctionComponent } from "react";
import { Card, ListGroup } from "react-bootstrap";
interface RequestComponentProps {
  domain: string;
  scheme: string;
  path: string;
}

const RequestComponent: FunctionComponent<RequestComponentProps> = ({
  domain,
  scheme,
  path,
}) => {
  return (
    <Card className="min-vh-50">
      <Card.Header>Request</Card.Header>

        <ListGroup className="d-flex">
          <ListGroup.Item>
            <div className="ms-2 me-auto">
              <div className="fw-bold">Domain</div>
              {domain}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="ms-2 me-auto">
              <div className="fw-bold">Scheme</div>
              {scheme}
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="ms-2 me-auto">
              <div className="fw-bold">Path</div>
              {path}
            </div>
          </ListGroup.Item>
        </ListGroup>
      
    </Card>
  );
};

export default RequestComponent;
