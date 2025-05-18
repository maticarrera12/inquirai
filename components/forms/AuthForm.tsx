"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  Field,
  FieldValue,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ROUTES from "@/constants/routes";


interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; data?: T }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {};

  const buttonText = formType === "SIGN_IN" ? "Iniciar Sesion" : "Registrarse";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-6">
        {Object.keys(defaultValues).map((key) => (
          <FormField
            key={key}
            control={form.control}
            name={key as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {field.name === "email"
                    ? "Email"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={field.name === "password" ? "password" : "text"}
                    {...field}
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark-300_light700 no-focus min-h-12
                 rounded-1.5 border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient w-full paragraph-medium min-h-12 rounded-2 px-4 py-3 font-inter !text-light-900"
        >
          {
            form.formState.isSubmitting
              ? buttonText === "Iniciar Sesion"
              ? "Iniciando Sesión..." : "Registrandose..." 
              : buttonText
          }
        </Button>


          {
            formType === "SIGN_IN" ? (
              <p>
                No tenes una cuenta?{" "} <Link href={ROUTES.SIGN_UP} className="paragraph-semibold primary-text-gradient">Registrate</Link>
              </p>
            ) : (
              <p>
                Ya tenes una cuenta?{" "} <Link href={ROUTES.SIGN_IN} className="paragraph-semibold primary-text-gradient">Inicia Sesion</Link>
              </p>
            )
          }
        
      </form>
    </Form>
  );
};

export default AuthForm;
