export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered";

export interface Order {
  id: string;
  customerName: string;
  roastType: string;
  quantity: number; // in kg
  totalAmount: number;
  status: OrderStatus;
  date: string;
}

const customers = [
  "Acme Corp",
  "Global Roasters",
  "Central Perk",
  "Blue Bottle",
  "Stumptown",
  "Peet's Coffee",
  "Philz Coffee",
  "Dunkin",
  "Starbucks",
  "Local Cafe",
];

const roasts = [
  "Ethiopia Yirgacheffe",
  "Colombia Supremo",
  "Brazil Santos",
  "Sumatra Mandheling",
  "Guatemala Antigua",
  "Costa Rica Tarrazu",
  "Kenya AA",
  "Espresso Blend",
];

const statuses: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered"];

export function generateMockOrders(count: number = 100): Order[] {
  const orders: Order[] = [];

  // Deterministic seed for consistent mock data
  let seed = 12345;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  for (let i = 0; i < count; i++) {
    const customer = customers[Math.floor(random() * customers.length)];
    const roast = roasts[Math.floor(random() * roasts.length)];
    const status = statuses[Math.floor(random() * statuses.length)];

    // Generate dates within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(random() * 30));

    const quantity = Math.floor(random() * 500) + 10; // 10 to 510 kg
    const pricePerKg = 8 + random() * 12; // €8 to €20
    const totalAmount = parseFloat((quantity * pricePerKg).toFixed(2));

    orders.push({
      id: `ORD-${1000 + i}`,
      customerName: customer,
      roastType: roast,
      quantity,
      totalAmount,
      status,
      date: date.toISOString().split("T")[0],
    });
  }

  // Sort by date descending
  return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
