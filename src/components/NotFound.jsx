import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <main>
        <h2>Hier gibts nichts zu sehen du schlingel! 404</h2>
      </main>
      <nav>
        <Link to="/">Back to Homepage</Link>
      </nav>
    </div>
  );
};

export default NotFound;
