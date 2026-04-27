import { useNavigate } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import type { ComponentProps } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { dashboardData } from "@/constants/sidebar";
import { CompanyInformation } from "./content-elements/-company-information";
import { NavigationContent } from "./content-elements/-navigation-content";
import { SearchSection } from "./content-elements/-search-section";
import { UserProfile } from "./content-elements/-user-profile";

export function AdminSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyInformation />
        <SearchSection />
      </SidebarHeader>

      <SidebarContent>
        <NavigationContent items={dashboardData.primary} section="Principal" />

        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate({ to: "/admin" })}
              className="cursor-pointer"
              tooltip="Configurações"
            >
              <Settings2 />
              <span>Configurações</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
