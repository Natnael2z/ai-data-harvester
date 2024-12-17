import { Activity, AlertCircle, Cpu, Database } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricsCard } from "@/components/MetricsCard";
import { TransactionList } from "@/components/TransactionList";

// Mock data - replace with actual API calls
const mockTransactions = [
  {
    id: "tx_123",
    timestamp: "2024-02-20 14:30:00",
    type: "LLM Processing",
    status: "success" as const,
    message: "Successfully processed user input",
  },
  {
    id: "tx_124",
    timestamp: "2024-02-20 14:29:00",
    type: "Data Fetch",
    status: "error" as const,
    message: "Failed to fetch voltage data: Timeout",
  },
  {
    id: "tx_125",
    timestamp: "2024-02-20 14:28:00",
    type: "Intent Analysis",
    status: "success" as const,
    message: "Intent identified: data_query",
  },
];

export default function Index() {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor your AI transactions and system performance
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Total Transactions"
            value="1,234"
            icon={<Activity className="h-4 w-4 text-primary" />}
            description="+20.1% from last hour"
          />
          <MetricsCard
            title="Error Rate"
            value="2.4%"
            icon={<AlertCircle className="h-4 w-4 text-destructive" />}
            description="1.1% decrease from average"
          />
          <MetricsCard
            title="Processing Time"
            value="245ms"
            icon={<Cpu className="h-4 w-4 text-primary" />}
            description="Average response time"
          />
          <MetricsCard
            title="Database Size"
            value="1.2GB"
            icon={<Database className="h-4 w-4 text-primary" />}
            description="Total stored data"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <TransactionList transactions={mockTransactions} />
        </div>
      </div>
    </DashboardLayout>
  );
}