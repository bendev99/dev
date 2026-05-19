import { Toaster } from "react-hot-toast";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";

const App = () => {
  return (
    <div>
      <Toaster />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
