import React from "react";
import { Link } from "react-router-dom";

const TestId = () => {
  return (
    <div>
      <main>
        <h2>This is the TestId page.</h2>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
};

export default TestId;
