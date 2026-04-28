import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/services/use-auth";
import { LogOut, TriangleAlert } from "lucide-react";
import { useState } from "react";

export function DangerZoneCard() {
  const { signOut } = useAuth();
  const [signOutOpen, setSignOutOpen] = useState(false);

  return (
    <>
      <Card className="border-red-200 dark:border-red-900/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TriangleAlert className="h-5 w-5 text-red-500" />
            <CardTitle className="text-xl text-red-500">Zona de risco</CardTitle>
          </div>
          <CardDescription>
            Ações irreversíveis relacionadas à sua conta. Prossiga com cuidado.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-sm">Encerrar sessão</p>
              <p className="text-muted-foreground text-xs">
                Você será desconectado e redirecionado para a página inicial.
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-2 gap-2 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-900/50 dark:hover:bg-red-950/30 sm:mt-0"
              onClick={() => setSignOutOpen(true)}
            >
              <LogOut className="h-4 w-4" />
              Sair da conta
            </Button>
          </div>

          <Separator className="bg-red-100 dark:bg-red-900/30" />

          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-sm">Excluir conta</p>
              <p className="text-muted-foreground text-xs">
                Remove permanentemente sua conta e todos os dados associados.
              </p>
            </div>
            <Button
              disabled
              variant="outline"
              className="mt-2 gap-2 border-red-200 text-red-400 sm:mt-0"
              title="Disponível em breve"
            >
              Excluir conta
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={signOutOpen} onOpenChange={setSignOutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Encerrar sessão?</DialogTitle>
            <DialogDescription>
              Você será desconectado da plataforma e redirecionado para a página
              inicial.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSignOutOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setSignOutOpen(false);
                signOut();
              }}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
