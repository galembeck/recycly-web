import { Link } from "@tanstack/react-router";
import { Recycle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function CompanyInformation() {
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex flex-col items-center justify-center gap-3 py-6">
        <Link className="flex items-center gap-2" to="/">
          <Recycle className="size-10 text-primary-green group-data-[collapsible=icon]:size-8" />

          <h1
            className={`font-semibold text-black text-xl lg:text-2xl dark:text-white ${state === "collapsed" ? "hidden" : "block"}`}
          >
            Recycly
          </h1>
        </Link>

        <Badge
          className={`border-3! text-center font-bold text-xs uppercase ${state === "collapsed" ? "hidden" : "block"}`}
          variant="outline"
        >
          Dashboard
        </Badge>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
