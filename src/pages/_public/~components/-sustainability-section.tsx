import { Badge } from "@/components/ui/badge";

export function SustainabilitySection() {
	return (
		<section
			className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
			id="sustainability"
		>
			<div className="flex w-full flex-col gap-6.5 rounded-4xl bg-[#B1D182]/50 p-6.5">
				<h1 className="font-bold text-5xl text-black">
					Alinhado aos objetivos de Desenvolvimento Sustentável da ONU
				</h1>

				<p className="text-black text-xl">
					O Recycly contribui diretamente para o alcance das metas globais de
					sustentabilidade.
				</p>

				<article className="grid grid-cols-1 gap-3 md:grid-cols-3">
					<div className="flex flex-col gap-2 rounded-[18px] bg-white p-2 shadow-lg">
						<Badge className="bg-primary-green! font-bold text-white text-xl">
							ODS 11
						</Badge>
						<span className="font-semibold text-black text-lg">
							Cidades e Comunidades Sustentáveis
						</span>
					</div>

					<div className="flex flex-col gap-2 rounded-[18px] bg-white p-2 shadow-lg">
						<Badge className="bg-primary-green! font-bold text-white text-xl">
							ODS 12
						</Badge>
						<span className="font-semibold text-black text-lg">
							Consumo e Produção Responsáveis
						</span>
					</div>

					<div className="flex flex-col gap-2 rounded-[18px] bg-white p-2 shadow-lg">
						<Badge className="bg-primary-green! font-bold text-white text-xl">
							ODS 13
						</Badge>
						<span className="font-semibold text-black text-lg">
							Ação contra a Mudança Global do Clima
						</span>
					</div>
				</article>
			</div>
		</section>
	);
}
