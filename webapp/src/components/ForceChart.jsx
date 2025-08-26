import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export default function ForceChart({ data }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-xl mb-2">Wykres siły</h2>
      <LineChart width={700} height={400} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" label={{ value: "Czas [ms]", position: "insideBottom", dy: 10 }} />
        <YAxis label={{ value: "Siła [N]", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Line type="monotone" dataKey="force" stroke="#2563eb" dot={false} />
      </LineChart>
    </div>
  );
}
