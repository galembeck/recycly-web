import { Hammer } from "lucide-react";
import { InformationCard } from "@/components/information-card";
import { Badge } from "@/components/ui/badge";
import { impacts } from "@/constants/impacts";

export function ImpactsSection() {
	return (
		<section
			className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
			id="impacts"
		>
			<div className="flex flex-col items-center justify-center gap-8">
				<article className="flex flex-col items-center justify-center gap-8">
					<Badge className="flex items-center gap-2 bg-gray-300 font-normal text-black/70 text-xl">
						<Hammer className="size-6!" />
						Impactos
					</Badge>

					<h1 className="text-center font-bold text-5xl text-black">
						Transformando a gestão de resíduos
					</h1>

					<p className="text-center font-normal text-black text-xl">
						Um projeto que gera impacto social, econômico e ambiental positivo.
					</p>
				</article>

				<div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
					{impacts.map((impact) => (
						<InformationCard
							description={impact.description}
							icon={impact.icon}
							key={impact.id}
							layout="success"
							title={impact.title}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
