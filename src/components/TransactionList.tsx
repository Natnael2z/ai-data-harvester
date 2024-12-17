import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Transaction {
  id: string;
  timestamp: string;
  type: string;
  status: "success" | "error" | "pending";
  message: string;
  comment?: string;
  resolved?: boolean;
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

export function TransactionList({ transactions: initialTransactions }: TransactionListProps) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  const handleAddComment = (id: string) => {
    setTransactions(prev =>
      prev.map(tx =>
        tx.id === id
          ? { ...tx, comment: commentText, resolved: true }
          : tx
      )
    );
    setEditingId(null);
    setCommentText("");
  };

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
            <TableHead>Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => {
            const { icon, label } = getPriorityInfo(tx);
            const isEditing = editingId === tx.id;

            return (
              <TableRow key={tx.id} className={tx.resolved ? "bg-muted/50" : ""}>
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
                <TableCell>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add your comment..."
                        className="min-h-[80px]"
                      />
                      <div className="space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleAddComment(tx.id)}
                        >
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {
                            setEditingId(null);
                            setCommentText("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {tx.comment ? (
                        <>
                          <p className="text-sm text-muted-foreground">{tx.comment}</p>
                          <Badge variant="outline" className="text-xs">
                            Resolved
                          </Badge>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(tx.id);
                            setCommentText("");
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Add Comment
                        </Button>
                      )}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}