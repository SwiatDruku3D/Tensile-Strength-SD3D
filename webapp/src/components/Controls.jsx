export default function Controls({ clearData }) {
  const sendCmd = async (cmd) => {
    await fetch(`/api/${cmd}`, { method: "POST" });
  };

  return (
    <div className="flex gap-2 justify-center">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-2xl shadow"
        onClick={() => sendCmd("tare")}
      >
        TARE
      </button>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-2xl shadow"
        onClick={() => sendCmd("start")}
      >
        START
      </button>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded-2xl shadow"
        onClick={() => sendCmd("stop")}
      >
        STOP
      </button>
      <button
        className="bg-gray-600 text-white px-4 py-2 rounded-2xl shadow"
        onClick={clearData}
      >
        CLEAR
      </button>
    </div>
  );
}
