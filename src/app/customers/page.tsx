import { Building2, Mail, MoreHorizontal } from "lucide-react";

export default function CustomersPage() {
  const customers = [
    {
      id: 1,
      name: "Acme Corp",
      contact: "Jane Doe",
      email: "jane@acmecorp.com",
      phone: "(555) 123-4567",
      orders: 124,
      totalSpent: "€45,200",
    },
    {
      id: 2,
      name: "Global Roasters",
      contact: "John Smith",
      email: "john@globalroasters.co",
      phone: "(555) 987-6543",
      orders: 89,
      totalSpent: "€32,100",
    },
    {
      id: 3,
      name: "Central Perk",
      contact: "Gunther",
      email: "orders@centralperk.com",
      phone: "(555) 555-0199",
      orders: 256,
      totalSpent: "€89,500",
    },
    {
      id: 4,
      name: "Blue Bottle",
      contact: "James Freeman",
      email: "supply@bluebottle.com",
      phone: "(555) 444-3322",
      orders: 312,
      totalSpent: "€112,000",
    },
    {
      id: 5,
      name: "Stumptown",
      contact: "Duane Sorenson",
      email: "hello@stumptown.com",
      phone: "(555) 222-1111",
      orders: 198,
      totalSpent: "€76,400",
    },
  ];

  return (
    <div className="py-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-on-surface tracking-tight mb-2">
            Customers
          </h1>
          <p className="text-on-surface-variant font-sans">Manage enterprise client accounts.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-on-primary rounded-md font-medium text-sm hover:bg-primary/90 transition-colors font-sans shadow-sm">
          Add New Customer
        </button>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left font-sans">
          <thead className="bg-[#F9F9F8] border-b border-border">
            <tr>
              <th className="px-6 py-4 font-semibold text-[11px] uppercase tracking-[0.05em] text-[#71716E]">
                Company
              </th>
              <th className="px-6 py-4 font-semibold text-[11px] uppercase tracking-[0.05em] text-[#71716E]">
                Primary Contact
              </th>
              <th className="px-6 py-4 font-semibold text-[11px] uppercase tracking-[0.05em] text-[#71716E] text-right">
                Lifetime Value
              </th>
              <th className="px-6 py-4 font-semibold text-[11px] uppercase tracking-[0.05em] text-[#71716E] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-background transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center mr-4">
                      <Building2 className="w-5 h-5 text-on-surface-variant" />
                    </div>
                    <div>
                      <p className="font-semibold text-on-surface">{customer.name}</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {customer.orders} orders to date
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-on-surface mb-1">{customer.contact}</p>
                  <div className="flex items-center text-xs text-on-surface-variant gap-3">
                    <span className="flex items-center">
                      <Mail className="w-3 h-3 mr-1" /> {customer.email}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="font-semibold text-on-surface tracking-tight">
                    {customer.totalSpent}
                  </p>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 rounded-md hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
