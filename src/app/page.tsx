import { KPICards } from "@/components/dashboard/KPICards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { GenerateReportButton } from "@/components/dashboard/GenerateReportButton";

export default function DashboardPage() {
  return (
    <div className="py-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-on-surface tracking-tight mb-2">
            Dashboard
          </h1>
          <p className="text-on-surface-variant font-sans">
            Overview of daily wholesale operations.
          </p>
        </div>
        <GenerateReportButton />
      </div>

      <KPICards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Placeholder for future widgets to complete the 12 column grid */}
        <div className="bg-surface border border-border rounded-lg p-6 shadow-sm flex flex-col justify-center items-center h-96">
          <p className="text-on-surface-variant font-medium font-sans text-sm text-center px-4">
            Recent Activity feed placeholder
          </p>
        </div>
      </div>
    </div>
  );
}
