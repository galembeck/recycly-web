import { Feather } from "lucide-react";
import { InformationCard } from "@/components/information-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { features } from "@/constants/features";

export function FeaturesSection() {
	return (
		<section
			className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
			id="features"
		>
			<div className="flex flex-col items-center justify-center gap-8">
				<article className="flex flex-col items-center justify-center gap-8">
					<Badge className="flex items-center gap-2 bg-primary-green/20 font-normal text-primary-green-dark text-xl">
						<Feather className="size-6!" />
						Funcionalidades
					</Badge>

					<h1 className="text-center font-bold text-5xl text-black">
						Tudo o que você precisa para reciclar melhor
					</h1>

					<p className="text-center font-normal text-black text-xl">
						Uma plataforma completa que conecta cidadãos, cooperativas e órgãos
						públicos
					</p>
				</article>

				<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
					{features.map((feature) => (
						<InformationCard
							description={feature.description}
							icon={feature.icon}
							key={feature.id}
							layout="success"
							title={feature.title}
						/>
					))}
				</div>

				<Separator className="my-8 bg-gray-300!" orientation="horizontal" />

				<article className="flex flex-col items-center justify-center gap-8">
					<h1 className="text-center font-bold text-5xl text-black">
						Interface intuitiva e fácil de usar
					</h1>

					<p className="text-center font-normal text-black text-xl">
						Desenvolvido com foco na experiência do usuário, o Recycly oferece
						uma interface limpa e moderna que torna a reciclagem mais acessível
						para todos.
					</p>
				</article>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="flex flex-col gap-6 rounded-[5px] bg-[#B1D182]/50 px-5 py-6 shadow-xl">
						<h1 className="font-semibold text-2xl text-black">
							Design responsivo
						</h1>

						<p className="text-black text-lg">
							Acesse de qualquer dispositivo, seja desktop, tablet ou
							smartphone, e tenha uma experiência consistente e otimizada para
							cada tela.
						</p>
					</div>

					<div className="flex flex-col gap-6 rounded-[5px] bg-[#B1D182]/50 px-5 py-6 shadow-xl">
						<h1 className="font-semibold text-2xl text-black">
							Navegação simplificada
						</h1>

						<p className="text-black text-lg">
							Encontre o que precisa em nossa plataforma com poucos cliques.
						</p>
					</div>

					<div className="flex flex-col gap-6 rounded-[5px] bg-[#B1D182]/50 px-5 py-6 shadow-xl">
						<h1 className="font-semibold text-2xl text-black">
							Atualizações em tempo real
						</h1>

						<p className="text-black text-lg">
							Informações sempre atualizadas sobre pontos de coletas e suas
							cooperativas.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
