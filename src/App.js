import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Test from "./components/Test";
import TestId from "./components/TestId";
import NotFound from "./components/NotFound";
import Messages from "./components/Messages";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";
import Navbar from "./components/Navbar";
import User from "./components/User";
import ProtectedRoutes from "./components/ProtectedRoutes";

import { useQuery, useSubscription } from "@apollo/client";

import { GET_ME, USERNAME_COLOR_SUBSCRIPTION } from "./module";
import { useEffect } from "react";

function App() {
  const { loading, error, data } = useQuery(GET_ME);

  // useEffect(() => {
  //   if (data?.me) {
  //     console.log("me", data.me);
  //   }
  // }, [data?.me]);

  return (
    <div className="App">
      <Navbar loading={loading} error={error} data={data} />
      <h1></h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<ProtectedRoutes user={data?.me} />}>
          <Route
            path="/user"
            element={loading ? <div>loading...</div> : <User user={data?.me} />}
          />
          <Route
            path="/messages"
            element={
              loading ? (
                <div>loading...</div>
              ) : (
                <Messages user={{ ...data?.me }} key={"chat"} />
              )
            }
          />
        </Route>
        <Route path="test" element={<Test />}>
          <Route path=":testId" element={<TestId />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
