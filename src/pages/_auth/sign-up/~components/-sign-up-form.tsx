import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
	formatBirthDate,
	formatCPF,
	formatWhatsApp,
	removeFormat,
} from "@/utils/format-masks";
import { isValidCPF } from "@/utils/is-valid-masks";

const signUpSchema = z
	.object({
		name: z.string().min(2, {
			message: "Nome deve ter no mínimo 2 caracteres",
		}),
		email: z.string().email({
			message: "Email deve ter um formato válido",
		}),
		document: z
			.string()
			.min(11, {
				message: "CPF deve ter 11 dígitos",
			})
			.refine(
				(value) => {
					const cleanCPF = removeFormat(value);
					return cleanCPF.length === 11 && isValidCPF(value);
				},
				{
					message: "CPF inválido",
				}
			),
		cellphone: z.string().min(11, {
			message: "Telefone deve ter 11 dígitos",
		}),
		birthDate: z
			.string()
			.min(8, {
				message: "Data de nascimento deve ter 8 dígitos",
			})
			.refine((value) => {
				const cleanBirthDate = removeFormat(value);
				return cleanBirthDate.length === 8;
			}),
		password: z.string().min(8, {
			message: "Mínimo de 8 caracteres",
		}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Senhas não coincidem",
		path: ["confirmPassword"],
	});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
	const navigate = useNavigate();

	const [serverError, setServerError] = useState("");

	const form = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			document: "",
			cellphone: "",
			birthDate: "",
			password: "",
			confirmPassword: "",
		},
	});

	function onSubmit(values: SignUpFormData) {
		try {
			setServerError("");

			// TODO: Implementar a lógica de cadastro chamando a API
			// await register({
			//  name: values.name,
			// 	email: values.email,
			//  document: values.document,
			// 	cellphone: values.cellphone,
			// 	birthDate: values.birthDate,
			// 	password: values.password,
			// })

			toast.success("Conta criada com sucesso!", {
				description: "Redirecionando para o painel administrativo...",
			});

			// TODO: Redirecionar para o painel administrativo
			navigate({ to: "/" });
		} catch (_error) {
			setServerError("E-mail ou senha inválidos.");

			toast.error("Erro ao realizar cadastro!", {
				description: "Verifique suas credenciais e tente novamente.",
			});
		}
	}

	return (
		<div className="flex max-h-full w-full flex-col gap-4 overflow-y-auto rounded-[10px] bg-white px-6 py-6 shadow-lg">
			<h1 className="text-center font-bold text-5xl text-[#5B5B5B]">
				Cadastrar-se
			</h1>

			<Form {...form}>
				<form
					className="mt-6 space-y-8"
					id="sign-up-form"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FieldGroup>
						<Controller
							control={form.control}
							name="name"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										className="font-afacad text-2xl text-black"
										htmlFor="sign-up-form-name"
									>
										Nome completo
									</FieldLabel>

									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										className="border-[#D9D9D9]! px-4! py-6 text-black! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
										id="sign-up-form-email"
										placeholder="Seu nome completo"
									/>

									{fieldState.invalid && (
										<FieldError
											className="text-lg!"
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="email"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										className="font-afacad text-2xl text-black"
										htmlFor="sign-up-form-email"
									>
										E-mail
									</FieldLabel>

									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										className="border-[#D9D9D9]! px-4! py-6 text-black! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
										id="sign-up-form-email"
										placeholder="seu@email.com"
										type="email"
									/>

									{fieldState.invalid && (
										<FieldError
											className="text-lg!"
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="document"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										className="font-afacad text-2xl text-black"
										htmlFor="sign-up-form-document"
									>
										CPF
									</FieldLabel>

									<Input
										aria-invalid={fieldState.invalid}
										className="border-[#D9D9D9]! px-4! py-6 text-black! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
										id="sign-up-form-document"
										name={field.name}
										onBlur={field.onBlur}
										onChange={(e) => {
											const formatted = formatCPF(e.target.value);
											field.onChange(formatted);
										}}
										placeholder="xxx.xxx.xxx-xx"
										ref={field.ref}
										value={field.value}
									/>

									{fieldState.invalid && (
										<FieldError
											className="text-lg!"
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="cellphone"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										className="font-afacad text-2xl text-black"
										htmlFor="sign-up-form-cellphone"
									>
										Telefone
									</FieldLabel>

									<Input
										aria-invalid={fieldState.invalid}
										className="border-[#D9D9D9]! px-4! py-6 text-black! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
										id="sign-up-form-cellphone"
										name={field.name}
										onBlur={field.onBlur}
										onChange={(e) => {
											const formatted = formatWhatsApp(e.target.value);
											field.onChange(formatted);
										}}
										placeholder="(xx) xxxxx-xxxx"
										ref={field.ref}
										value={field.value}
									/>

									{fieldState.invalid && (
										<FieldError
											className="text-lg!"
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="birthDate"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										className="font-afacad text-2xl text-black"
										htmlFor="sign-up-form-birthDate"
									>
										Data de nascimento
									</FieldLabel>

									<Input
										aria-invalid={fieldState.invalid}
										className="border-[#D9D9D9]! px-4! py-6 text-black! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
										id="sign-up-form-birthDate"
										name={field.name}
										onBlur={field.onBlur}
										onChange={(e) => {
											const formatted = formatBirthDate(e.target.value);
											field.onChange(formatted);
										}}
										placeholder="dd/mm/aaaa"
										ref={field.ref}
										value={field.value}
									/>

									{fieldState.invalid && (
										<FieldError
											className="text-lg!"
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="password"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										className="font-afacad text-2xl text-black"
										htmlFor="sign-up-form-password"
									>
										Senha
									</FieldLabel>

									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										className="border-[#D9D9D9]! px-4! py-6 text-black! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
										id="sign-up-form-password"
										placeholder="******"
										type="password"
									/>

									{fieldState.invalid && (
										<FieldError
											className="text-lg!"
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>

						<Controller
							control={form.control}
							name="confirmPassword"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										className="font-afacad text-2xl text-black"
										htmlFor="sign-up-form-confirmPassword"
									>
										Confirmar senha
									</FieldLabel>

									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										className="border-[#D9D9D9]! px-4! py-6 text-black! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
										id="sign-up-form-confirmPassword"
										placeholder="******"
										type="password"
									/>

									{fieldState.invalid && (
										<FieldError
											className="text-lg!"
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							)}
						/>
					</FieldGroup>

					<Button
						className="w-full cursor-pointer bg-primary-green py-6! font-medium text-white text-xl hover:bg-primary-green/90"
						// disabled={isLoggingIn}
						type="submit"
						variant="secondary"
					>
						{/* {isLoggingIn ? (
							<div className="flex gap-4">
								<Spinner />
								<p>Entrando...</p>
							</div>
						) : ( */}
						<div className="group flex items-center gap-2 transition-all">
							<span>Cadastrar</span>
							<span className="ml-1 transition-all duration-300 group-hover:-translate-x-4 group-hover:opacity-0">
								<ArrowRight />
							</span>
						</div>
						{/* )} */}
					</Button>
				</form>
			</Form>

			<Link
				className="text-center text-lg text-primary-green-dark"
				to="/sign-in"
			>
				Já tem uma conta? <strong className="text-primary-green">Entrar</strong>
			</Link>

			<Separator className="bg-gray-300" />

			<Button
				className="flex cursor-pointer items-center gap-2 bg-white! text-center text-lg text-primary-green-dark hover:bg-white/90! hover:text-primary-green-dark/80"
				onClick={() => navigate({ to: "/" })}
				variant="ghost"
			>
				<ArrowLeft />
				Voltar
			</Button>
		</div>
	);
}
