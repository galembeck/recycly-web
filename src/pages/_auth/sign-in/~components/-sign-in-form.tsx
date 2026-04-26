import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/hooks/services/use-auth";
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
  email: z.email({
    message: "O email deve ter um formato válido.",
  }),
  password: z.string().min(1, {
    message: "A senha é obrigatória.",
  }),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const navigate = useNavigate();
  const { signIn, isPending, serverError, setServerError } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignInFormData) {
    setServerError("");

    signIn({ email: values.email, password: values.password });
  }

  return (
    <div className="flex max-h-full w-full flex-col gap-4 overflow-y-auto rounded-[10px] bg-white dark:bg-third-dark px-6 py-6 shadow-lg">
      <h1 className="text-center font-bold text-5xl text-black dark:text-white">
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
                    className="font-afacad text-2xl text-black dark:text-white"
                    htmlFor="sign-in-form-email"
                  >
                    E-mail
                  </FieldLabel>

                  <div className="relative">
                    <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="border-[#D9D9D9]! dark:border-muted-foreground/30! pl-12! py-6 text-black! dark:text-white! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
                      id="sign-in-form-email"
                      placeholder="seu@email.com"
                      type="email"
                    />
                  </div>

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
                    className="font-afacad text-2xl text-black dark:text-white"
                    htmlFor="sign-in-form-password"
                  >
                    Senha
                  </FieldLabel>

                  <div className="relative">
                    <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="border-[#D9D9D9]! dark:border-muted-foreground/30! pl-12! pr-10! py-6 text-black! dark:text-white! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
                      id="sign-in-form-password"
                      placeholder="******"
                      type={showPassword ? "text" : "password"}
                    />

                    <button
                      type="button"
                      className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

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
            <p className="text-center text-red-500 text-lg">{serverError}</p>
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
        className="text-center text-lg text-primary-green-dark dark:text-white"
        to="/sign-up"
      >
        Não tem uma conta?{" "}
        <strong className="text-primary-green">Criar conta</strong>
      </Link>

      <Separator className="bg-gray-300 dark:bg-muted-foreground/30" />

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
