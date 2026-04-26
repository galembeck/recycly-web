import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarFold,
  Eye,
  EyeOff,
  FileUser,
  ImagePlus,
  Loader2,
  Lock,
  Mail,
  Phone,
  Plus,
  Trash2,
  User,
  X,
} from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { useUser } from "@/hooks/services/use-user";
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
import { useState } from "react";

const signUpSchema = z
  .object({
    name: z.string().min(2, {
      message: "Nome deve ter no mínimo 2 caracteres",
    }),
    email: z.email({
      message: "Email deve ter um formato válido",
    }),
    document: z
      .string()
      .min(11, {
        message: "CPF deve ter 11 dígitos",
      })
      .refine(
        (value) => {
          const cleanDocument = removeFormat(value);
          return cleanDocument.length === 11 && isValidCPF(value);
        },
        {
          message: "CPF inválido",
        },
      ),
    phones: z
      .array(
        z.object({
          number: z.string().min(11, {
            message: "Telefone deve ter 11 dígitos",
          }),
        }),
      )
      .min(1, {
        message: "Adicione pelo menos 1 telefone.",
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
    password: z
      .string()
      .min(8, { message: "Mínimo de 8 caracteres" })
      .refine((v) => /[A-Z]/.test(v), {
        message: "Deve conter ao menos uma letra maiúscula",
      })
      .refine((v) => /[a-z]/.test(v), {
        message: "Deve conter ao menos uma letra minúscula",
      })
      .refine((v) => /[0-9]/.test(v), {
        message: "Deve conter ao menos um número",
      })
      .refine((v) => /[^A-Za-z0-9]/.test(v), {
        message: "Deve conter ao menos um caractere especial",
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

  const { register, isPending, serverError } = useUser();

  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      document: "",
      phones: [{ number: "" }],
      birthDate: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "phones",
  });

  function onSubmit(values: SignUpFormData) {
    const cleanDocument = removeFormat(values.document);
    const cleanPhones = values.phones.map((p) => removeFormat(p.number));

    const [day, month, year] = values.birthDate.split("/");
    const birthDate = `${year}-${month}-${day}`;

    register({
      name: values.name,
      email: values.email,
      document: cleanDocument,
      password: values.password,
      birthDate,
      phones: cleanPhones,
      profileType: 1,
      avatar: avatarFile,
    });
  }

  return (
    <div className="flex max-h-full w-full flex-col gap-4 overflow-y-auto rounded-[10px] bg-white dark:bg-third-dark px-6 py-6 shadow-lg">
      <h1 className="text-center font-bold text-5xl text-[#5B5B5B] dark:text-white">
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
                    className="font-afacad text-2xl text-black dark:text-white"
                    htmlFor="sign-up-form-name"
                  >
                    Nome completo
                  </FieldLabel>

                  <div className="relative">
                    <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="border-[#D9D9D9]! dark:border-muted-foreground/30! pl-12! py-6 text-black! dark:text-white! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
                      id="sign-up-form-email"
                      placeholder="Seu nome completo"
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

            <Field>
              <FieldLabel className="font-afacad text-2xl text-black dark:text-white">
                Foto / Documento (opcional)
              </FieldLabel>

              <label
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#D9D9D9] dark:border-muted-foreground/30 px-4 py-4 shadow-sm transition-colors hover:border-primary-green"
                htmlFor="sign-up-form-avatar"
              >
                <ImagePlus className="h-5 w-5 shrink-0 text-gray-400" />

                <span className="flex-1 truncate text-xl text-[#B3B3B3] dark:text-muted-foreground">
                  {avatarFile ? avatarFile.name : "Selecionar arquivo..."}
                </span>

                {avatarFile && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setAvatarFile(undefined);
                    }}
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                <input
                  accept="image/*,.pdf"
                  className="hidden"
                  id="sign-up-form-avatar"
                  type="file"
                  onChange={(e) => setAvatarFile(e.target.files?.[0])}
                />
              </label>
            </Field>

            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="font-afacad text-2xl text-black dark:text-white"
                    htmlFor="sign-up-form-email"
                  >
                    E-mail
                  </FieldLabel>

                  <div className="relative">
                    <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="border-[#D9D9D9]! dark:border-muted-foreground/30! pl-12! py-6 text-black! dark:text-white! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
                      id="sign-up-form-email"
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
              name="document"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="font-afacad text-2xl text-black dark:text-white"
                    htmlFor="sign-up-form-document"
                  >
                    CPF
                  </FieldLabel>

                  <div className="relative">
                    <FileUser className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      aria-invalid={fieldState.invalid}
                      className="border-[#D9D9D9]! dark:border-muted-foreground/30! pl-12! py-6 text-black! dark:text-white! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
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

            <div className="space-y-4">
              {fields.map((fieldItem, index) => (
                <Controller
                  key={fieldItem.id}
                  control={form.control}
                  name={`phones.${index}.number`}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="font-afacad text-2xl text-black dark:text-white">
                        Telefone {index + 1}
                      </FieldLabel>

                      <div className="flex gap-2 items-center">
                        <div className="relative flex-1">
                          <div className="relative">
                            <Phone className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                            <Input
                              {...field}
                              aria-invalid={fieldState.invalid}
                              className="border-[#D9D9D9]! dark:border-muted-foreground/30! pl-12! py-6 text-black! dark:text-white! text-xl! shadow-sm"
                              onChange={(e) =>
                                field.onChange(formatWhatsApp(e.target.value))
                              }
                              placeholder="(xx) xxxxx-xxxx"
                            />
                          </div>
                        </div>

                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-red-500 hover:bg-red-50"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        )}
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
              ))}

              <button
                type="button"
                onClick={() => append({ number: "" })}
                className="flex items-center cursor-pointer gap-2 text-primary-green font-medium hover:underline text-lg mt-2"
              >
                <Plus className="h-5 w-5" />
                Adicionar outro telefone
              </button>
            </div>

            <Controller
              control={form.control}
              name="birthDate"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="font-afacad text-2xl text-black dark:text-white"
                    htmlFor="sign-up-form-birthDate"
                  >
                    Data de nascimento
                  </FieldLabel>

                  <div className="relative">
                    <CalendarFold className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      aria-invalid={fieldState.invalid}
                      className="border-[#D9D9D9]! dark:border-muted-foreground/30! pl-12! py-6 text-black! dark:text-white! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
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
                    htmlFor="sign-up-form-password"
                  >
                    Senha
                  </FieldLabel>

                  <div className="relative">
                    <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="border-[#D9D9D9]! dark:border-muted-foreground/30! pl-12! pr-10! py-6 text-black! dark:text-white! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
                      id="sign-up-form-password"
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

            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="font-afacad text-2xl text-black dark:text-white"
                    htmlFor="sign-up-form-confirmPassword"
                  >
                    Confirmar senha
                  </FieldLabel>

                  <div className="relative">
                    <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="border-[#D9D9D9]! dark:border-muted-foreground/30! pl-12! pr-10! py-6 text-black! dark:text-white! text-xl! shadow-sm placeholder:text-[#B3B3B3]"
                      id="sign-up-form-confirmPassword"
                      placeholder="******"
                      type={showPasswordConfirmation ? "text" : "password"}
                    />

                    <button
                      type="button"
                      className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPasswordConfirmation((v) => !v)}
                    >
                      {showPasswordConfirmation ? (
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
                <p>Cadastrando...</p>
              </div>
            ) : (
              <div className="group flex items-center gap-2 transition-all">
                <span>Cadastrar</span>
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
