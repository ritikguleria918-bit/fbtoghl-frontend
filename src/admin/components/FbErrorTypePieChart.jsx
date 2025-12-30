import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const COLORS = ["#F59E0B", "#EF4444"];

export default function FbErrorTypePieChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                >
                    {data.map((_, index) => (
                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

                <Tooltip
                    contentStyle={{
                        backgroundColor: "#16A34A",
                        border: "1px solid #374151",
                        borderRadius: "0.5rem",
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
