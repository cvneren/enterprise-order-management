import { Package, AlertTriangle, Search, Filter } from "lucide-react";

export default function InventoryPage() {
  const roasts = [
    { id: 1, name: "Ethiopia Yirgacheffe", type: "Light Roast", stock: 850, status: "Healthy" },
    {
      id: 2,
      name: "Colombia Supremo",
      type: "Medium Roast",
      stock: 120,
      status: "Low Stock",
      alert: true,
    },
    { id: 3, name: "Brazil Santos", type: "Medium Roast", stock: 1200, status: "Healthy" },
    { id: 4, name: "Sumatra Mandheling", type: "Dark Roast", stock: 450, status: "Healthy" },
    { id: 5, name: "Guatemala Antigua", type: "Medium Roast", stock: 600, status: "Healthy" },
    {
      id: 6,
      name: "Costa Rica Tarrazu",
      type: "Light Roast",
      stock: 50,
      status: "Critical",
      alert: true,
    },
    { id: 7, name: "Kenya AA", type: "Light Roast", stock: 320, status: "Healthy" },
    { id: 8, name: "Espresso Blend", type: "Dark Roast", stock: 2100, status: "Healthy" },
  ];

  return (
    <div className="py-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-on-surface tracking-tight mb-2">
            Inventory
          </h1>
          <p className="text-on-surface-variant font-sans">Monitor coffee roast stock levels.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-on-surface-variant absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search roasts..."
              className="pl-9 pr-4 py-2 bg-surface border border-border rounded-md text-sm focus:ring-primary focus:border-primary font-sans"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-md text-sm font-medium hover:bg-background transition-colors text-on-surface font-sans">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {roasts.map((roast) => (
          <div
            key={roast.id}
            className={`bg-surface border rounded-lg shadow-sm flex flex-col relative overflow-hidden transition-colors hover:border-primary/50 ${
              roast.status === "Critical"
                ? "border-red-200"
                : roast.status === "Low Stock"
                  ? "border-amber-200"
                  : "border-border"
            }`}
          >
            {roast.alert ? (
              <div
                className={`h-[33px] w-full text-[11px] font-bold uppercase tracking-widest text-center font-sans flex items-center justify-center gap-1.5 shadow-sm border-b ${
                  roast.status === "Critical"
                    ? "bg-red-50 text-red-800 border-red-100"
                    : "bg-amber-50 text-amber-900 border-amber-200"
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {roast.status}
              </div>
            ) : (
              <div className="h-[33px] w-full bg-transparent"></div>
            )}

            <div className="flex-1 p-6 pt-4">
              <div className="flex-1 mb-6">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${
                    roast.status === "Critical"
                      ? "bg-red-100 text-red-700"
                      : roast.status === "Low Stock"
                        ? "bg-amber-100 text-amber-900"
                        : "bg-primary-container/10 text-primary"
                  }`}
                >
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-on-surface leading-tight mb-1">
                  {roast.name}
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-surface-variant text-on-surface-variant font-sans">
                  {roast.type}
                </span>
              </div>

              <div className="pt-4 border-t border-border flex items-end justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#71716E] mb-1 font-sans">
                    Stock Level
                  </p>
                  <p
                    className={`font-sans font-semibold text-xl ${
                      roast.status === "Critical"
                        ? "text-red-700"
                        : roast.status === "Low Stock"
                          ? "text-amber-900"
                          : "text-on-surface"
                    }`}
                  >
                    {roast.stock}{" "}
                    <span className="text-sm font-normal text-on-surface-variant">kg</span>
                  </p>
                </div>
                {roast.alert && (
                  <button className="px-3 py-1.5 text-xs font-semibold bg-surface border border-border rounded shadow-sm hover:bg-background transition-colors font-sans text-on-surface">
                    Restock
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
