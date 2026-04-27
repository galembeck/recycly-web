import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/faq/cooperatives/")({
  component: CooperativesFAQ,
  head: () => ({
    meta: [
      {
        title:
          "FAQ - Cooperativas | Recycly - Reciclagem rápida, fácil e eficiente",
      },
    ],
  }),
});

function CooperativesFAQ() {
  return (
    <main className="min-h-screen bg-primary-green py-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center font-bold text-6xl text-white">
          Cooperativas
        </h1>

        <div className="flex flex-col gap-4">
          <section className="rounded-lg bg-primary-green-dark/30 p-6 flex flex-col gap-8">
            <article>
              <h2 className="mb-3 font-bold text-xl text-white">
                Fortaleça sua cooperativa com mais visibilidade
              </h2>

              <p className="text-white/90 leading-relaxed">
                Nossa plataforma conecta pessoas que desejam descartar materiais
                recicláveis com pontos de coleta próximos. Ao cadastrar sua
                cooperativa, você facilita o acesso da população à reciclagem e
                aumenta o volume de materiais recebidos.
              </p>

              <p className="mt-2 text-white/90 leading-relaxed">
                Com mais pessoas encontrando sua cooperativa, o impacto
                ambiental positivo cresce e o trabalho realizado pela equipe
                ganha mais reconhecimento na comunidade.
              </p>
            </article>

            <Separator orientation="horizontal" className="bg-white/30" />

            <article>
              <h2 className="mb-3 font-bold text-xl text-white">
                Como funciona
              </h2>

              <p className="text-white/90 leading-relaxed">
                O processo de cadastro é simples e rápido.
              </p>

              <p className="text-white/90 leading-relaxed">
                Primeiro, a cooperativa realiza o cadastro na plataforma
                informando seus dados básicos.
              </p>

              <p className="text-white/90 leading-relaxed">
                Em seguida, são indicados o endereço, horários de funcionamento
                e os tipos de materiais recicláveis aceitos.
              </p>

              <p className="text-white/90 leading-relaxed">
                Após a aprovação, o ponto de coleta passa a aparecer no mapa do
                site, permitindo que usuários encontrem facilmente a cooperativa
                e levem seus materiais para reciclagem.
              </p>
            </article>

            <Separator orientation="horizontal" className="bg-white/30" />

            <article>
              <h2 className="mb-3 font-bold text-xl text-white">
                Benefícios para cooperativas
              </h2>

              <p className="mb-2 text-white/90">
                Ao participar da plataforma, sua cooperativa pode:
              </p>

              <ul className="list-disc space-y-1 pl-5 text-white/90">
                <li>Aumentar a visibilidade na região</li>

                <li>Receber maior volume de materiais recicláveis</li>

                <li>
                  Facilitar o contato com moradores interessados em reciclar
                </li>

                <li>
                  Divulgar o trabalho social e ambiental realizado pela
                  cooperativa
                </li>
              </ul>
            </article>

            <Separator orientation="horizontal" className="bg-white/30" />

            <article>
              <h2 className="mb-3 font-bold text-xl text-white">
                Faça parte da rede de reciclagem
              </h2>

              <p className="text-white/90 leading-relaxed">
                Cadastre sua cooperativa e ajude a ampliar o acesso à reciclagem
                na sua cidade, promovendo um futuro mais sustentável para todos.
              </p>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
