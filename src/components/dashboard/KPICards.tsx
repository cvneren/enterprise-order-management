import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export function KPICards() {
  const kpis = [
    {
      title: "Total Revenue",
      value: "€124,563.00",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Orders",
      value: "142",
      change: "+4.1%",
      trend: "up",
      icon: ShoppingCart,
    },
    {
      title: "New Customers",
      value: "28",
      change: "-2.3%",
      trend: "down",
      icon: Users,
    },
    {
      title: "Low Stock Alerts",
      value: "3",
      change: "Requires action",
      trend: "neutral",
      icon: AlertTriangle,
      alert: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {kpis.map((kpi) => (
        <div key={kpi.title} className="bg-surface border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#71716E] font-sans">
              {kpi.title}
            </h3>
            <div
              className={`p-2 rounded-md ${kpi.alert ? "bg-error-container text-on-error-container" : "bg-[#e2e2e2] text-primary"}`}
            >
              <kpi.icon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-heading text-2xl font-semibold text-on-surface tracking-tight">
              {kpi.value}
            </span>
            <span
              className={`flex items-center text-sm font-medium font-sans ${
                kpi.trend === "up"
                  ? "text-[#384b3a]"
                  : kpi.trend === "down"
                    ? "text-[#ba1a1a]"
                    : "text-on-surface-variant"
              }`}
            >
              {kpi.trend === "up" && <ArrowUpRight className="w-4 h-4 mr-1" />}
              {kpi.trend === "down" && <ArrowDownRight className="w-4 h-4 mr-1" />}
              {kpi.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
