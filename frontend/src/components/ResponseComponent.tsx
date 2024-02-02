import { FunctionComponent } from "react";
import { Card, ListGroup, CardBody } from "react-bootstrap";
interface ResponseProps {
  http_version: string;
  location?: string;
  date: string;
  server: string;
}

const ResponseComponent: FunctionComponent<ResponseProps> = ({
  http_version,
  location,
  date,
  server,
}) => {
  return (
    <Card className="min-vh-50">
      <Card.Header>Resonse</Card.Header>
      <CardBody>
        <ListGroup variant="flush">
          <ListGroup.Item>{http_version}</ListGroup.Item>
          <ListGroup.Item>
            {location ? "Location: " + location : "Date: " + date}
          </ListGroup.Item>
          <ListGroup.Item>Server: {server}</ListGroup.Item>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default ResponseComponent;
