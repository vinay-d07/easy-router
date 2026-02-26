"use client";
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, Settings, User, Key, Cpu, CreditCard } from "lucide-react";
import { useState } from "react";
import ApiKeyManager from "@/components/ApiKeyManager";
import ModelsManager from "@/components/ModelsManager";
import PaymentsManager from "@/components/PaymentsManager";
const layout = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'apikeys', label: 'API Keys', icon: Key },
    { id: 'models', label: 'Models', icon: Cpu },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'apikeys':
        return <ApiKeyManager />;
      case 'models':
        return <ModelsManager />;
      case 'payments':
        return <PaymentsManager />;
      default:
        return children;
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    className={activeTab === item.id ? 'bg-blue-50 text-blue-600' : ''}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {/* Additional sidebar content can go here */}
        </SidebarContent>
      </Sidebar>
      <main className="flex-1">
        <div className="flex items-center gap-2 p-4">
          <SidebarTrigger />
        </div>
        {renderContent()}
      </main>
    </SidebarProvider>
  );
};

export default layout;
