import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const Home = () => {
  return (
    <div>
      <main>
        <h2>This is the Homepage.</h2>
      </main>
      <nav>
        <Link to="/test">Test</Link>
        <hr />
        <Link to="/messages">Messages</Link>
      </nav>
      <RegisterForm />
    </div>
  );
};

export default Home;
