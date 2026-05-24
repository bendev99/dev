import { useState } from "react";

export default function PrintInvoice({ invoiceData = {} }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handlePrint = async () => {
    // DEBUG : Voir ce qui est disponible dans window.api
    console.log("window.api :", window.api);
    console.log("printInvoice existe ?", typeof window.api?.printInvoice);

    if (!window.api?.printInvoice) {
      setStatus("❌ printInvoice non trouvé dans window.api");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const result = await window.api.printInvoice(invoiceData);
      if (result.success) {
        setStatus("✅ Ticket envoyé à l'imprimante !");
      } else {
        setStatus(`❌ Erreur imprimante: ${result.error}`);
      }
    } catch (err) {
      setStatus(`❌ Crash IPC: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        {invoiceData.storeName}
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Ticket #{invoiceData.ticketId}
      </p>

      <div className="space-y-2 mb-4 border-t border-b py-3">
        {invoiceData.items?.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>
              {item.qty}x {item.name}
            </span>
            <span>{(item.qty * item.price).toFixed(2)} €</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between font-bold text-lg mb-5">
        <span>TOTAL</span>
        <span>{invoiceData.total?.toFixed(2)} €</span>
      </div>

      <button
        onClick={handlePrint}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span>⏳ Envoi...</span>
        ) : (
          <span>🖨️ Imprimer la facture</span>
        )}
      </button>

      {status && (
        <p
          className={`mt-3 text-center text-sm font-medium ${status.includes("✅") ? "text-green-600" : "text-red-500"}`}
        >
          {status}
        </p>
      )}
    </div>
  );
}
