import { Activity, Database, AlertCircle, Home, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Overview", icon: Home, url: "/" },
  { title: "Transactions", icon: Activity, url: "/transactions" },
  { title: "Errors", icon: AlertCircle, url: "/errors" },
  { title: "Database", icon: Database, url: "/database" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <h1 className="text-xl font-bold text-primary">AI Monitor</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}