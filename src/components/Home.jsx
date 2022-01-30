import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./Register/RegisterForm";

const Home = () => {
  return (
    <div>
      <main>
        <h2>This is the Homepage.</h2>
      </main>
      <nav>
        <Link to="/test">Test</Link>
        <hr />
      </nav>
    </div>
  );
};

export default Home;
