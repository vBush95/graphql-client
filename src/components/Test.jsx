import React from "react";
import { Link, Outlet } from "react-router-dom";

const Test = () => {
  return (
    <div>
      <main>
        <h2>This is the Testpage.</h2>
      </main>
      <nav>
        <Link to=":testId">TestId</Link>
        {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
        <Outlet />
      </nav>
    </div>
  );
};

export default Test;
