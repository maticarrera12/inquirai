import ROUTES from "./routes";

export const DEFAULT_EMPTY = {
    title: "No se encontraron datos",
    message:
        "Parece que la base de datos está dormida. Despiértala agregando nuevas entradas.",
    button: {
        text: "Agregar datos",
        href: ROUTES.HOME,
    },
};

export const DEFAULT_ERROR = {
    title: "Algo salió mal",
    message: "Hasta nuestro código puede tener un mal día. Inténtalo de nuevo.",
    button: {
        text: "Reintentar",
        href: ROUTES.HOME,
    },
};

export const EMPTY_QUESTION = {
    title: "¡Aún no hay preguntas!",
    message:
        "El tablero de preguntas está vacío. Quizás espera tu brillante pregunta para comenzar.",
    button: {
        text: "Haz una pregunta",
        href: ROUTES.ASK_QUESTION,
    },
};

export const EMPTY_TAGS = {
    title: "No se encontraron etiquetas",
    message: "La nube de etiquetas está vacía. Agrega algunas palabras clave.",
    button: {
        text: "Crear etiqueta",
        href: ROUTES.TAGS,
    },
};
export const EMPTY_ANSWERS = {
    title: "No se encontraron respuestas",
    message: "Parece que aún no has respondido a ninguna pregunta. ¡Comparte tu conocimiento!",
};

export const EMPTY_COLLECTIONS = {
    title: "No hay colecciones",
    message:
        "Parece que aún no has creado ninguna colección. ¡Comienza a organizar algo extraordinario hoy!",
    button: {
        text: "Guardar en colección",
        href: ROUTES.COLLECTION,
    },
};

export const EMPTY_USERS = {
    title: "No se encontraron usuarios",
    message: "Parece que la comunidad está un poco tranquila. ¡Invita a tus amigos!",
}