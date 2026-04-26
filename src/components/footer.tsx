import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Recycle } from "lucide-react";

export function Footer() {
	return (
		<footer className="bg-primary-green-dark">
			<div className="container mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-12">
				<div className="grid grid-cols-1 gap-8 pb-10 lg:grid-cols-3">
					<div>
						<Link
							className="flex items-center justify-center gap-2 font-bold text-2xl text-white sm:justify-start"
							to="/"
						>
							{/* <img
									alt="Fyno"
									className="size-7"
									src="/assets/icons/logo.svg"
								/> */}
							<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-green">
								<Recycle className="size-6 text-white" />
							</div>
							Recycly
						</Link>

						<p className="mt-6 text-center text-white leading-relaxed sm:max-w-xs sm:text-left">
							Conectando cidadãos, cooperativas e órgãos públicos para uma
							coleta seletiva mais eficiente e sustentável.
						</p>

						<ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
							<li>
								<Link rel="noreferrer" target="_blank" to="/">
									<span className="sr-only">Instagram</span>
									<Instagram className="text-white" />
								</Link>
							</li>

							<li>
								<Link rel="noreferrer" target="_blank" to="/">
									<span className="sr-only">LinkedIn</span>
									<Linkedin className="text-white" />
								</Link>
							</li>
						</ul>
					</div>

					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
						<div className="text-center sm:text-left">
							<p className="font-medium text-lg text-white">Plataforma</p>

							<ul className="mt-8 space-y-4 text-sm">
								<li>
									<Link
										className="text-white transition hover:text-white/80"
										to="/"
									>
										Como funciona
									</Link>
								</li>

								<li>
									<Link
										className="text-white transition hover:text-white/80"
										to="/"
									>
										Funcionalidades
									</Link>
								</li>

								<li>
									<Link
										className="text-white transition hover:text-white/80"
										to="/"
									>
										Para cooperativa(s)
									</Link>
								</li>

								<li>
									<Link
										className="text-white transition hover:text-white/80"
										to="/"
									>
										Para prefeitura(s)
									</Link>
								</li>
							</ul>
						</div>

						<div className="text-center sm:text-left">
							<p className="font-medium text-lg text-white">Recursos</p>

							<ul className="mt-8 space-y-4 text-sm">
								<li>
									<Link
										className="text-white transition hover:text-white/80"
										to="/"
									>
										Guias de reciclagem
									</Link>
								</li>

								<li>
									<Link
										className="text-white transition hover:text-white/80"
										to="/"
									>
										Blog
									</Link>
								</li>

								<li>
									<Link
										className="text-white transition hover:text-white/80"
										to="/"
									>
										FAQ
									</Link>
								</li>

								<li>
									<Link
										className="text-white transition hover:text-white/80"
										to="/"
									>
										Suporte
									</Link>
								</li>
							</ul>
						</div>

						<div className="text-center sm:text-left">
							<p className="font-medium text-lg text-white">Contato</p>

							<ul className="mt-8 space-y-4 text-sm">
								<li>
									<a
										className="text-white transition hover:text-white/80"
										href="mailto:contato@recycly.com.br"
										rel="noopener noreferrer"
										target="_blank"
									>
										contato@recycly.com.br
									</a>
								</li>

								<li>
									<p className="text-white">(11) 99999-9999</p>
								</li>

								<li>
									<p className="text-white">Campinas, SP, Brasil</p>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-4 border-[#F4F1E980] border-t py-6 md:flex-row md:items-center md:justify-between">
					<p className="truncate text-center text-base text-white sm:order-first sm:mt-0 md:text-left">
						&copy; {new Date().getFullYear()} All rights reserved. Fyno LTDA |
						CNPJ XX.XXX.XXX/XXXX-XX
					</p>

					<div className="flex flex-col items-center gap-4 md:flex-row">
						<Link className="text-white transition hover:text-white/80" to="/">
							Política de Privacidade
						</Link>

						<Link className="text-white transition hover:text-white/80" to="/">
							Termos de Uso
						</Link>

						<Link className="text-white transition hover:text-white/80" to="/">
							Cookies
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
