import { ArrowBigRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function IntroSection() {
  const scrollToMap = () =>
    document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="container mx-auto grid max-w-6xl gap-8 p-8 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-8"
      id="intro"
    >
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-6xl text-primary-green-dark dark:text-white leading-20">
          Recicle de forma{" "}
          <span className="text-primary-green">inteligente</span> e{" "}
          <span className="text-primary-green">sustentável</span>.
        </h1>

        <p className="font-normal text-primary-green-dark dark:text-muted-foreground text-xl">
          Conectamos você aos pontos de coleta mais próximos, fornecemos
          informações sobre reciclagem e facilitamos o agendamento de coletas
          domiciliares.
        </p>

        <Button
          className="w-full cursor-pointer self-start bg-[#E5E5E8] dark:bg-primary-green text-lg text-primary-green dark:text-white shadow-lg transition-all duration-300 hover:bg-[#E5E5E8] dark:hover:bg-primary-green/80 hover:shadow-xl md:w-fit"
          onClick={scrollToMap}
        >
          Pontos de coleta próximos
          <ArrowBigRight className="fill-primary-green" />
        </Button>

        <div className="flex gap-8 border-gray-300 dark:border-muted-foreground/30 border-t pt-8">
          <article>
            <div className="font-bold text-5xl text-primary-green">500+</div>
            <div className="text-primary-green-dark dark:text-muted-foreground">
              Pontos de coleta
            </div>
          </article>

          <article>
            <div className="font-bold text-5xl text-primary-green">10k</div>
            <div className="text-primary-green-dark dark:text-muted-foreground">
              Usuários ativos
            </div>
          </article>

          <article>
            <div className="font-bold text-5xl text-primary-green">50ton</div>
            <div className="text-primary-green-dark dark:text-muted-foreground">
              Recicladas
            </div>
          </article>
        </div>
      </div>

      {/* <div className="h-125 w-full rounded-lg bg-primary-green" /> */}

      {/** biome-ignore lint/correctness/useImageSize: not required by @TailwindCSS */}
      <img
        alt="Recycly"
        className="h-125 w-full rounded-lg"
        src="/assets/images/recycling-intro.png"
      />
    </section>
  );
}
