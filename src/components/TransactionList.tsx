import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface Transaction {
  id: string;
  timestamp: string;
  type: string;
  status: "success" | "error" | "pending";
  message: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const getPriorityInfo = (tx: Transaction) => {
  if (tx.status === "error") {
    if (tx.type.toLowerCase().includes("llm") || tx.type.toLowerCase().includes("intent")) {
      return {
        priority: "high",
        icon: <AlertTriangle className="h-4 w-4 text-destructive" />,
        label: "High Priority"
      };
    }
    return {
      priority: "medium",
      icon: <AlertCircle className="h-4 w-4 text-yellow-500" />,
      label: "Medium Priority"
    };
  }
  return {
    priority: "low",
    icon: <Info className="h-4 w-4 text-muted-foreground" />,
    label: "Low Priority"
  };
};

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Priority</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => {
            const { icon, label } = getPriorityInfo(tx);
            return (
              <TableRow key={tx.id}>
                <TableCell>
                  <div className="flex items-center gap-2" title={label}>
                    {icon}
                  </div>
                </TableCell>
                <TableCell className="font-mono">{tx.id}</TableCell>
                <TableCell>{tx.timestamp}</TableCell>
                <TableCell>{tx.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      tx.status === "success"
                        ? "default"
                        : tx.status === "error"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md truncate">{tx.message}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}