import {z} from "zod"

export const SignInSchema = z.object({
  email: z
  .string()
  .min(1, {message: "El email es requerido"})
  .email({message:"El email no es válido"}),


  password: z
  .string()
  .min(6, {message: "La contraseña debe tener al menos 6 caracteres"})
  .max(30, {message: "La contraseña no puede tener más de 30 caracteres"})
})

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres." })
    .max(30, { message: "El nombre de usuario no puede tener más de 30 caracteres." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "El nombre de usuario solo puede contener letras, números y guiones bajos.",
    }),

  name: z
    .string()
    .min(1, { message: "El nombre es obligatorio." })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "El nombre solo puede contener letras y espacios.",
    }),

  email: z
    .string()
    .min(1, { message: "El correo electrónico es obligatorio." })
    .email({ message: "Por favor, ingresa una dirección de correo válida." }),

  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
    .max(100, { message: "La contraseña no puede tener más de 100 caracteres." })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula.",
    })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial.",
    }),
});
