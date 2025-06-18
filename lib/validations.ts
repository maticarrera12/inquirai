import { z } from "zod";
import { InteractionActionEnums } from "@/database/interaction.model";

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "El email no es válido" }),

  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(30, { message: "La contraseña no puede tener más de 30 caracteres" }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres.",
    })
    .max(30, {
      message: "El nombre de usuario no puede tener más de 30 caracteres.",
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "El nombre de usuario solo puede contener letras, números y guiones bajos.",
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
    .max(100, {
      message: "La contraseña no puede tener más de 100 caracteres.",
    })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula.",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula.",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial.",
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "El titulo es requerido" })
    .max(100, { message: "El titulo no puede exceder los 100 caracterres" }),

  content: z.string().min(1, { message: "La descripcion es necesaria" }),

  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag es requerido" })
        .max(30, { message: "Tag no puede exceder los 30 caracteres" })
    )
    .min(1, { message: "Al menos un tag es necesario" })
    .max(5, { message: "No se pueden agregar mas de 5 tags." }),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z
    .string()
    .min(1, { message: "El ID de la pregunta es requerido." }),
});

export const GetQuestionSchema = z.object({
  questionId: z
    .string()
    .min(1, { message: "El ID de la pregunta es requerido." }),
});

export const UserSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido." }),
  username: z
    .string()
    .min(3, { message: "El username debe tener al menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor inserte un email valido." }),
  bio: z.string().optional(),
  image: z
    .string()
    .url({ message: "Por favor inserte una url valida." })
    .optional(),
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
  image: z
    .string()
    .url({ message: "Por favor, proporciona una URL válida." })
    .optional(),
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
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial.",
    })
    .optional(),
  provider: z.string().min(1, { message: "El proveedor es requerido." }),
  providerAccountId: z
    .string()
    .min(1, { message: "El ID de la cuenta del proveedor es requerido." }),
});

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string()
    .min(1, { message: "El ID de la cuenta del proveedor es requerido." }),
  user: z.object({
    name: z.string().min(1, { message: "El nombre es requerido." }),
    username: z.string().min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres.",
    }),
    email: z
      .string()
      .email({ message: "Por favor, ingresa una dirección de correo válida." }),
    image: z
      .string()
      .url({ message: "Por favor inserte una URL de imagen válida." })
      .optional(),
  }),
});

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, { message: "El Tag ID es requerido." }),
});

export const IncrementViewsSchema = z.object({
  questionId: z
    .string()
    .min(1, { message: "El ID de la pregunta es requerido." }),
});

export const AnswerSchema = z.object({
  content: z
    .string()
    .min(20, { message: "Las respuestas deben tener mas de 20 caracteres." }),
});

export const AnswerServerSchema = AnswerSchema.extend({
  questionId: z
    .string()
    .min(1, { message: "El ID de la pregunta es requerido." }),
});
export const GetAnswersSchema = PaginatedSearchParamsSchema.extend({
  questionId: z
    .string()
    .min(1, { message: "El ID de la pregunta es requerido." }),
});

export const AIAnswerSchema = z.object({
  question: z
    .string()
    .min(5, { message: "La pregunta es requerida." })
    .max(130, { message: "La pregunta no puede exceder los 130 caracteres." }),
  content: z
    .string()
    .min(100, { message: "La respuesta debe tener mas de 100 caracteres." }),
  userAnswer: z
    .string()
    .min(20, {
      message: "La respuesta del usuario debe tener mas de 20 caracteres.",
    }),
});

export const CreateVoteSchema = z.object({
  targetId: z.string().min(1, { message: "El ID del objetivo es requerido." }),
  targetType: z.enum(["question", "answer"], {
    message: "El tipo de objetivo es requerido.",
  }),
  voteType: z.enum(["upvote", "downvote"], {
    message: "El tipo de voto es requerido.",
  }),
});

export const UpdateVoteCountSchema = CreateVoteSchema.extend({
  change: z.number().int().min(-1).max(1),
});

export const HasVotedSchema = CreateVoteSchema.pick({
  targetId: true,
  targetType: true,
});

export const CollectionBaseSchema = z.object({
  questionId: z
    .string()
    .min(1, { message: "El ID de la pregunta es requerido." }),
});

export const GetUserSchema = z.object({
  userId: z.string().min(1, { message: "El ID del usuario es requerido." }),
});

export const GetUserQuestionSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, { message: "El ID del usuario es requerido." }),
});

export const GetUserAnswersSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, { message: "El ID del usuario es requerido." }),
});

export const GetUserTagsSchema = z.object({
  userId: z.string().min(1, { message: "El ID del usuario es requerido." }),
});

export const DeleteQuestionSchema = z.object({
  questionId: z
    .string()
    .min(1, { message: "El ID de la pregunta es requerido." }),
});

export const DeleteAnswerSchema = z.object({
  answerId: z
    .string()
    .min(1, { message: "El ID de la respuesta es requerido." }),
});

export const CreateInteractionSchema = z.object({
  action: z.enum(InteractionActionEnums),
  actionTarget: z.enum(["question", "answer"]),
  actionId: z.string().min(1),
  authorId: z.string().min(1),
});
