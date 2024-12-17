import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

export function MetricsCard({ title, value, icon, description }: MetricsCardProps) {
  return (
    <Card className="bg-card/50 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}