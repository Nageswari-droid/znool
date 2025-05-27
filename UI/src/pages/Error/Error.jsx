/**
 * Page component for displaying error messages based on error type.
 *
 * Shows different messages and actions for 400, 404, and 500 errors.
 */
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography, Utility } from "@visa/nova-react";
import ServerSVG from "../../assets/ServerError";
import {
  RETURN,
  SERVER_DOWN,
  NOT_FOUND,
  BAD_REQUEST,
  SERVER_ERROR,
  BOOK_NOT_FOUND,
  SAME_AUTHOR_ERROR,
} from "../../constants/string";

/**
 * Error page for displaying error messages based on error code.
 * @component
 * @returns {JSX.Element}
 */
const Error = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  /**
   * Returns the error title based on error code.
   * @returns {string}
   */
  const errorTitle = () => {
    switch (id) {
      case "500":
        return SERVER_DOWN;
      case "404":
        return NOT_FOUND;
      case "400":
        return BAD_REQUEST;
      default:
        return SERVER_DOWN;
    }
  };

  /**
   * Returns the error message based on error code.
   * @returns {string}
   */
  const errorMessage = () => {
    switch (id) {
      case "500":
        return SERVER_ERROR;
      case "404":
        return BOOK_NOT_FOUND;
      case "400":
        return SAME_AUTHOR_ERROR;
      default:
        return SERVER_ERROR;
    }
  };

  return (
    <div
      aria-label="Error page"
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
        <Typography
          variant="body-1"
          style={{ textAlign: "center" }}
          role="alert"
          aria-live="assertive"
        >
          {errorMessage()}
        </Typography>
        <Button
          role="button"
          colorScheme="primary"
          onClick={() => {
            if (id === "500") navigate("/");
            else navigate("/get-all-books");
          }}
        >
          {RETURN}
        </Button>
      </Utility>
    </div>
  );
};

export default Error;
