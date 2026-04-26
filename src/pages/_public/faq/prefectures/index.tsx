import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/faq/prefectures/")({
  component: PrefecturesFAQ,
  head: () => ({
    meta: [
      {
        title:
          "FAQ - Prefeituras | Recycly - Reciclagem rápida, fácil e eficiente",
      },
    ],
  }),
});

function PrefecturesFAQ() {
  return (
    <main className="min-h-screen bg-primary-green py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center font-bold text-6xl text-white">
          Prefeituras
        </h1>

        <div className="flex flex-col gap-4">
          <section className="rounded-lg bg-primary-green-dark/30 p-6 flex flex-col gap-8">
            <article>
              <h2 className="mb-3 font-bold text-xl text-white">
                Incentive a reciclagem no seu município
              </h2>

              <p className="text-white/90 leading-relaxed">
                Nossa plataforma foi desenvolvida para facilitar o acesso da
                população a pontos de coleta de materiais recicláveis. Ao
                colaborar com o projeto, as prefeituras podem contribuir para a
                organização das informações sobre reciclagem na cidade e
                incentivar práticas sustentáveis entre os moradores. A
                disponibilização de pontos de coleta em um mapa acessível
                permite que mais pessoas façam o descarte correto de resíduos.
              </p>
            </article>

            <Separator orientation="horizontal" className="bg-white/30" />

            <article>
              <h2 className="mb-3 font-bold text-xl text-white">
                Como a prefeitura pode utilizar a plataforma
              </h2>

              <p className="text-white/90 leading-relaxed">
                A plataforma pode ser utilizada como uma ferramenta de apoio à
                gestão ambiental do município. Por meio dela, é possível
                cadastrar e divulgar pontos de coleta existentes na cidade,
                incluindo cooperativas, ecopontos e locais parceiros que recebem
                materiais recicláveis. Dessa forma, os cidadãos conseguem
                localizar facilmente onde descartar cada tipo de resíduo.
              </p>
            </article>

            <Separator orientation="horizontal" className="bg-white/30" />

            <article>
              <h2 className="mb-3 font-bold text-xl text-white">
                Benefícios para o município
              </h2>

              <p className="mb-2 text-white/90">
                Ao utilizar a plataforma, a prefeitura pode:
              </p>

              <ul className="list-disc space-y-1 pl-5 text-white/90">
                <li>Incentivar a reciclagem entre os moradores</li>

                <li>Reduzir o descarte incorreto de resíduos</li>

                <li>Fortalecer cooperativas de reciclagem locais</li>

                <li>Promover educação ambiental para a população</li>

                <li>Facilitar o acesso a informações sobre coleta seletiva</li>
              </ul>
            </article>

            <Separator orientation="horizontal" className="bg-white/30" />

            <article>
              <h2 className="mb-3 font-bold text-xl text-white">
                Apoio à sustentabilidade urbana
              </h2>

              <p className="text-white/90 leading-relaxed">
                A organização e divulgação dos pontos de coleta contribuem para
                o desenvolvimento de cidades mais sustentáveis, reduzindo
                impactos ambientais e promovendo uma gestão mais eficiente dos
                resíduos sólidos.
              </p>
            </article>

            <Separator orientation="horizontal" className="bg-white/30" />

            <article>
              <h2 className="mb-3 font-bold text-xl text-white">
                Entre em contato
              </h2>

              <p className="text-white/90 leading-relaxed">
                Caso sua prefeitura tenha interesse em colaborar com a
                iniciativa ou divulgar os pontos de coleta do município na
                plataforma, entre em contato com nossa equipe para obter mais
                informações sobre como participar.
              </p>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
