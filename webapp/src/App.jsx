import { useEffect, useState, useRef } from "react";
import ForceChart from "./components/ForceChart";
import Controls from "./components/Controls";

export default function App() {
  const [data, setData] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.host}/ws`);
    wsRef.current = ws;

    ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        setData((prev) => [...prev, msg]);
      } catch (e) {
        console.error("Błąd parsowania", e);
      }
    };

    return () => ws.close();
  }, []);

  const clearData = () => setData([]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">
        Maszyna wytrzymałościowa
      </h1>
      <Controls clearData={clearData} />
      <ForceChart data={data} />
    </div>
  );
}
