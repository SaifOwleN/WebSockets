import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./Components/Chat";
import Join from "./Components/Join";

const app = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default app;
