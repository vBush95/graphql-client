import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Test from "./components/Test";
import TestId from "./components/TestId";
import NotFound from "./components/NotFound";
import Messages from "./components/Messages";

function App() {
  return (
    <div className="App">
      <h1>React Router</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="messages" element={<Messages user={"admin"} />} />
        <Route path="test" element={<Test />}>
          <Route path=":testId" element={<TestId />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
