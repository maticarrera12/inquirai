"use client";

import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { use, useState } from "react";
import { toast } from "sonner";

const SaveQuestion = ({
  questionId,
  hasSavedQuestionPromise,
}: {
  questionId: string;
  hasSavedQuestionPromise: Promise<ActionResponse<{ saved: boolean }>>;
}) => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const { data } = use(hasSavedQuestionPromise);
  const {saved: hasSaved} = data || {};

  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async () => {
    if (isLoading) return;
    if (!userId) {
      return toast.error(
        "Debes iniciar sesión para guardar una pregunta",
        {
          description:
            "Inicia sesión o regístrate para guardar preguntas y respuestas.",
          duration: 3000,
        }
      );
    }

    setIsLoading(true);

    try {
      const { success, data, error } = await toggleSaveQuestion({ questionId });

      if (!success)
        throw new Error(error?.message || "Error al guardar la pregunta");

      toast.success(
        `Pregunta ${data?.saved ? "guardada" : "eliminada"} correctamente`,
        {
          duration: 3000,
        }
      );
    } catch (error) {
      toast.error("Error al guardar la pregunta", {
        description:
          error instanceof Error ? error.message : "Ocurrio un error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <Image
        src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
        alt="Guardar"
        width={18}
        height={18}
        className={`cursor-pointer ${isLoading && "opacity-50"}`}
        aria-label="Guardar"
        onClick={handleSave}
      />
    </div>
  );
};

export default SaveQuestion;
