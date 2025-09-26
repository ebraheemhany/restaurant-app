import { useContext } from "react";
import { AppContext } from "../../Context/Context";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
export const TopProductsPie = () => {
  const { topProducts } = useContext(AppContext);
  const product = topProducts.slice(0, 5);

 // ألوان للقطاعات
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="bg-white/10 rounded-2xl p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-3">Top Selling Products</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={product}
            dataKey="sales"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {product.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
