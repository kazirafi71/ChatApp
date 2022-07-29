import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4 className="text-center py-3">Welcome to ChatApp</h4>
      <div className="text-center ">
        <Button onClick={() => navigate("/login")}>Login Here</Button>
      </div>
    </div>
  );
};

export default HomePage;
