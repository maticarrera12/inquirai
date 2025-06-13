"use client";

import { toggleSaveQuestion } from "@/lib/actions/collection.action";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { fi } from "zod/v4/locales";

const SaveQuestion = ({ questionId }: { questionId: string }) => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const [isLoading, setIsLoading] = useState(false);
  const handleSave = async () => {
    if (isLoading) return;
    if (!userId) {
      return toast.error(
        "Debes iniciar sesión para guardar una      pregunta",
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

      if(!success) throw new Error(error?.message || "Error al guardar la pregunta");

    toast.success(`Pregunta ${data?.saved ? "guardada" : "eliminada"} correctamente`, {
        duration: 3000,
        });
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

  const hasSaved= false

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
