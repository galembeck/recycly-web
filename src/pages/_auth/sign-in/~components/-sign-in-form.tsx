import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { type ApiException } from "@/services/api";
import { authService } from "@/services/auth";
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

const signInSchema = z.object({
	email: z.string().email({
		message: "O email deve ter um formato válido.",
	}),
	password: z.string().min(1, {
		message: "A senha é obrigatória.",
	}),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
	const navigate = useNavigate();
	const { refetch } = useAuth();

	const [serverError, setServerError] = useState("");

	const form = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { mutate: signIn, isPending } = useMutation({
		mutationFn: authService.signIn,
		onSuccess: async () => {
			refetch();
			toast.success("Bem-vindo de volta!", {
				description: "Redirecionando para o painel administrativo...",
			});
			navigate({ to: "/admin/dashboard" });
		},
		onError: (err) => {
			const message =
				(err as ApiException).status === 400
					? "E-mail ou senha inválidos."
					: "Erro ao realizar login. Tente novamente.";
			setServerError(message);
			toast.error("Erro ao realizar login!", {
				description: "Verifique suas credenciais e tente novamente.",
			});
		},
	});

	function onSubmit(values: SignInFormData) {
		setServerError("");
		signIn({ email: values.email, password: values.password });
	}

	return (
		<div className="flex max-h-full w-full flex-col gap-4 overflow-y-auto rounded-[10px] bg-white px-6 py-6 shadow-lg">
			<h1 className="text-center font-bold text-5xl text-[#5B5B5B]">
				Entrar na conta
			</h1>

			<Form {...form}>
				<form
					className="mt-6 space-y-8"
					id="sign-in-form"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FieldGroup>
						<Controller
							control={form.control}
							name="email"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										className="font-afacad text-2xl text-black"
										htmlFor="sign-in-form-email"
									>
										E-mail
									</FieldLabel>

									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										className="border-[#D9D9D9]! px-4! py-6 text-black! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
										id="sign-in-form-email"
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
							name="password"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										className="font-afacad text-2xl text-black"
										htmlFor="sign-in-form-password"
									>
										Senha
									</FieldLabel>

									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										className="border-[#D9D9D9]! px-4! py-6 text-black! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
										id="sign-in-form-password"
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

					{serverError && (
						<p className="text-center text-red-500 text-sm">{serverError}</p>
					)}

					<Button
						className="w-full cursor-pointer bg-primary-green py-6! font-medium text-white text-xl hover:bg-primary-green/90"
						disabled={isPending}
						type="submit"
						variant="secondary"
					>
						{isPending ? (
							<div className="flex items-center gap-4">
								<Loader2 className="animate-spin" />
								<p>Entrando...</p>
							</div>
						) : (
							<div className="group flex items-center gap-2 transition-all">
								<span>Entrar</span>
								<span className="ml-1 transition-all duration-300 group-hover:-translate-x-4 group-hover:opacity-0">
									<ArrowRight />
								</span>
							</div>
						)}
					</Button>
				</form>
			</Form>

			<Link
				className="text-center text-lg text-primary-green-dark"
				to="/sign-up"
			>
				Não tem uma conta?{" "}
				<strong className="text-primary-green">Criar conta</strong>
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
