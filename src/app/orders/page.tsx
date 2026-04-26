import { DataTable } from "@/components/orders/DataTable";
import { BulkActionBar } from "@/components/orders/BulkActionBar";
import { OrderDetailsDrawer } from "@/components/orders/OrderDetailsDrawer";
import { generateMockOrders } from "@/lib/mockData";
import { simulatedFetch } from "@/lib/mockApi";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  // Generate mock data and simulate fetching with latency and potential errors
  const mockOrders = generateMockOrders(100);
  const data = await simulatedFetch(mockOrders);

  return (
    <div className="py-6 relative">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-on-surface tracking-tight mb-2">
            Orders
          </h1>
          <p className="text-on-surface-variant font-sans">
            Manage and track live wholesale orders.
          </p>
        </div>
      </div>

      <DataTable data={data} />
      <BulkActionBar />
      <OrderDetailsDrawer />
    </div>
  );
}
