import { Toaster } from "react-hot-toast";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import PrintInvoice from "./components/PrintInvoice";

const App = () => {
  const sampleInvoice = {
    storeName: "BOUTIQUE XYZ",
    ticketId: "TKT-0042",
    items: [
      { name: "Café Expresso", qty: 2, price: 1.5 },
      { name: "Croissant", qty: 1, price: 1.2 },
    ],
    total: 4.2,
  };

  return (
    <div>
      <Toaster />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          {/* <Route
            path="/"
            element={<PrintInvoice invoiceData={sampleInvoice} />}
          /> */}
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
