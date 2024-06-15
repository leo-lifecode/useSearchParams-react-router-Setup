import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchParams from "./components/SearchParams";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchParams />} />
      </Routes>
    </Router>
  );
}

export default App;
