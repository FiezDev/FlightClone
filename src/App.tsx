import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Flight from "./modules/flight";
import SwaggerDoc from "./modules/swagger";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Flight />} />
        <Route path="/swagger" element={<SwaggerDoc />} />
      </Routes>
    </Router>
  );
};

export default App;
