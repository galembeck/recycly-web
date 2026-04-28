import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PublicUserDTO } from "@/types/user";
import { formatCPF, formatWhatsApp } from "@/utils/format-masks";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, FileUser, Hash, Phone } from "lucide-react";

type Props = {
  user: PublicUserDTO;
};

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 rounded-lg border p-2">
        <Icon className="h-4 w-4 text-primary-green" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-muted-foreground text-xs uppercase tracking-wide">
          {label}
        </span>
        <span className="font-medium">{value}</span>
      </div>
    </div>
  );
}

export function ProfileInfoCard({ user }: Props) {
  const [year, month, day] = user.birthDate.split("-");
  const birthDateFormatted = format(
    new Date(Number(year), Number(month) - 1, Number(day)),
    "dd 'de' MMMM 'de' yyyy",
    { locale: ptBR },
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Informações pessoais</CardTitle>
        <CardDescription>
          Dados cadastrais vinculados à sua conta na plataforma.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <InfoRow
          icon={FileUser}
          label="CPF"
          value={formatCPF(user.document)}
        />

        <Separator />

        <InfoRow
          icon={CalendarDays}
          label="Data de nascimento"
          value={birthDateFormatted}
        />

        <Separator />

        <InfoRow icon={Hash} label="ID da conta" value={user.id} />

        <Separator />

        <div className="flex items-start gap-4">
          <div className="mt-0.5 rounded-lg border p-2">
            <Phone className="h-4 w-4 text-primary-green" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground text-xs uppercase tracking-wide">
              {user.phones.length === 1 ? "Telefone" : "Telefones"}
            </span>
            <div className="flex flex-col gap-1">
              {user.phones.map((phone) => (
                <span key={phone} className="font-medium">
                  {formatWhatsApp(phone)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
