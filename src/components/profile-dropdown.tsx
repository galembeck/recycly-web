import { useAuth } from "@/hooks/services/use-auth";
import { getInitials } from "@/utils/get-initials";
import { useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ProfileDropdown() {
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();

    toast.success("Desconectado!", {
      description: "Esperamos te ver em breve em nossa plataforma...",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary-green font-semibold text-white text-sm hover:bg-primary-green/90 transition-colors"
        >
          {getInitials(user?.name)}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-56">
        {user && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground">
                Painel administrativo
              </DropdownMenuLabel>

              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => navigate({ to: "/admin/dashboard" })}
                >
                  <LayoutDashboard />
                  Dashboard
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="group focus:text-red-400"
              onClick={handleSignOut}
            >
              <LogOut className="group-focus:text-red-400" />
              Sair
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
