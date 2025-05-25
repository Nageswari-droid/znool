import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Utility } from "@visa/nova-react";
import ServerSVG from "../assets/ServerError";

const ServerErrorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const errorTitle = () => {
    switch (id) {
      case "500":
        return "Server is down";
      case "404":
        return "Not found!";
      case "400":
        return "Bad Request";
      default:
        return "";
    }
  };

  const errorMessage = () => {
    switch (id) {
      case "500":
        return "Sorry, we couldn't connect to the server. Please try again later.";
      case "404":
        return "Book doesn't exists!";
      case "400":
        return "Book with the same author already exists! Please create a new book";
      default:
        return "";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <Utility vFlex vFlexCol vGap={32} style={{ alignItems: "center" }}>
        <ServerSVG />
        <Typography
          variant="headline-3"
          as="h1"
          style={{ color: "#1434cb", textAlign: "center" }}
        >
          {errorTitle()}
        </Typography>
        <Typography variant="body-1" style={{ textAlign: "center" }}>
          {errorMessage()}
        </Typography>
        <Button
          colorScheme="primary"
          onClick={() => {
            if (id === "500") navigate("/");
            else navigate("/get-all-books");
          }}
        >
          Return
        </Button>
      </Utility>
    </div>
  );
};

export default ServerErrorPage;
