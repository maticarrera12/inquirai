import {z} from "zod"

export const SignInSchema = z.object({
  email: z
  .string()
  .min(1, {message: "El email es requerido"})
  .email({message:"El email no es válido"}),


  password: z
  .string()
  .min(8, {message: "La contraseña debe tener al menos 8 caracteres"})
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
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
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

export const AskQuestionSchema = z.object({
  title: z
  .string()
  .min(5, {message: 'El titulo es requerido'})
  .max(100, {message: "El titulo no puede exceder los 100 caracterres"}),

  content: z
  .string()
  .min(1, {message: "La descripcion es necesaria"}),

  tags: z.
  array(
    z.
    string()
    .min(1, {message: "Tag es requerido"})
    .max(30,{message: "Tag no puede exceder los 30 caracteres"})
  )
  .min(1,{message: "Al menos un tag es necesario"})
  .max(5, {message:"No se pueden agregar mas de 5 tags."})
})

export const UserSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido." }),
  username: z
    .string()
    .min(3, { message: "El username debe tener al menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor inserte un email valido." }),
  bio: z.string().optional(),
  image: z.string().url({ message: "Por favor inserte una url valida." }).optional(),
  location: z.string().optional(),
  portfolio: z
    .string()
    .url({ message: "Por favor inserte una url valida" })
    .optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, { message: "El UserId es requerido." }),
  name: z.string().min(1, { message: "El nombre es requerido." }),
  image: z.string().url({ message: "Por favor, proporciona una URL válida." }).optional(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .max(100, { message: "La contraseña no puede exceder los 100 caracteres." })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula.",
    })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial.",
    })
    .optional(),
  provider: z.string().min(1, { message: "El proveedor es requerido." }),
  providerAccountId: z
    .string()
    .min(1, { message: "El ID de la cuenta del proveedor es requerido." }),
});