import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow key={tx.id}>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}