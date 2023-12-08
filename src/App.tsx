import { Route, Routes } from "react-router-dom";
import * as P from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<P.Chat />} />
      <Route path="/login" element={<P.Login />} />
    </Routes>
  );
}

export default App;
