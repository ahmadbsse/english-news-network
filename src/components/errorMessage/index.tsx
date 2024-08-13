import { Alert } from "react-bootstrap";

const ErrorMessage = ({ text }: { text: string }) => {
  return (
    <Alert variant={"danger"} dismissible={true}>
      {text}
    </Alert>
  );
};

export default ErrorMessage;
