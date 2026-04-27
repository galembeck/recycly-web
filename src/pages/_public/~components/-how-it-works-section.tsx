import { BadgeCheck, X } from "lucide-react";
import { InformationCard } from "@/components/information-card";
import { Badge } from "@/components/ui/badge";
import { problems } from "@/constants/problems";

export function HowItWorksSection() {
  return (
    <section
      className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      id="how-it-works"
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <article className="flex flex-col items-center justify-center gap-8">
          <Badge className="flex items-center gap-2 bg-primary-red/10 dark:bg-primary-red font-normal text-primary-red dark:text-white text-xl">
            <X className="size-5! stroke-3!" />O problema
          </Badge>

          <h1 className="text-center font-bold text-5xl text-black dark:text-white">
            A falta de informação sobre coleta seletiva
          </h1>

          <p className="text-center font-normal text-black dark:text-muted-foreground text-xl">
            Moradores urbanos enfrentam diversos desafios para descartar
            resíduos de forma sustentável
          </p>
        </article>

        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem) => (
            <InformationCard
              description={problem.description}
              icon={problem.icon}
              key={problem.id}
              layout="destructive"
              title={problem.title}
            />
          ))}
        </div>

        <Badge className="flex items-center gap-2 bg-primary-green/20 dark:bg-primary-green font-normal text-primary-green-dark dark:text-white text-xl">
          <BadgeCheck className="size-6!" />O Recycly resolve todos esses
          problemas
        </Badge>
      </div>
    </section>
  );
}
