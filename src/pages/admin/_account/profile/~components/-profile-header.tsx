import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { PublicUserDTO } from "@/types/user";
import { getInitials } from "@/utils/get-initials";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, Clock } from "lucide-react";

type Props = {
  user: PublicUserDTO;
};

export function ProfileHeader({ user }: Props) {
  return (
    <Card className="border-0 bg-primary-green text-white">
      <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20 border-4 border-white/30 text-2xl">
            <AvatarFallback className="bg-white/20 font-bold text-2xl text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-3xl leading-tight">{user.name}</h2>
            <p className="text-white/80">{user.email}</p>
            <Badge className="mt-1 w-fit bg-white/20 text-white hover:bg-white/30">
              Cooperativa
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-white/80 sm:items-end">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span>
              Membro desde{" "}
              {format(new Date(user.createdAt), "dd 'de' MMMM 'de' yyyy", {
                locale: ptBR,
              })}
            </span>
          </div>

          {user.lastAccessAt && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" />
              <span>
                Último acesso:{" "}
                {format(
                  new Date(user.lastAccessAt),
                  "dd/MM/yyyy 'às' HH:mm",
                  { locale: ptBR },
                )}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
