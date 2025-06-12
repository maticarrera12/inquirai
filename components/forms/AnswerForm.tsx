"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createAnswer } from "@/lib/actions/answer.action";
import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";
import Image from "next/image";
import { ReloadIcon } from "@radix-ui/react-icons";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface Props {
  questionId: string;
  questionTitle: string;
  questionContent: string;
}

const AnswerForm = ({ questionId, questionTitle, questionContent }: Props) => {
  const [isAnswering, startAnsweringTransition] = useTransition();
  const [isAISubmitting, setIsAISubmitting] = useState(false);
  const session = useSession();
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    startAnsweringTransition(async () => {
      const result = await createAnswer({
        questionId,
        content: values.content,
      });

      if (result.success) {
        form.reset();
        toast.success("Respuesta posteada con éxito", {
          description: "Tu pregunta ha sido posteada.",
          duration: 3000,
        });

        if (editorRef.current) {
          editorRef.current.setMarkdown("");
        }
      } else {
        toast.error("Error al enviar la respuesta", {
          description: result?.error?.message,
          duration: 3000,
        });
      }
    });
  };

  const generateAIAnswer = async () => {
    if (session.status !== "authenticated") {
      return toast.error(
        "Debes iniciar sesión para generar respuestas con IA",
        {
          duration: 3000,
        }
      );
    }

    setIsAISubmitting(true);

    const userAnswer = editorRef.current?.getMarkdown() || "";

    try {
      const { success, data, error } = await api.ai.getAnswer(
        questionTitle,
        questionContent,
        userAnswer
      );

      if (!success) {
        return toast.error("Error al generar respuesta con IA", {
          description:
            error?.message || "Por favor, intenta nuevamente más tarde.",
          duration: 3000,
        });
      }

      const formattedAnswer = data.replace(/<br>/g, " ").toString().trim();

      if (editorRef.current) {
        editorRef.current.setMarkdown(formattedAnswer);
        form.setValue("content", formattedAnswer);
        form.trigger("content");
      }

      toast.success("Respuesta generada con éxito", {
        description:
          "La respuesta ha sido generada por IA y añadida al editor.",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error al generar respuesta con IA", {
        description:
          error instanceof Error
            ? error.message
            : "Por favor, intenta nuevamente más tarde.",
        duration: 3000,
      });
    } finally {
      setIsAISubmitting(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Escribi aca tu respuesta
        </h4>
        <Button
          className="btn light-border-2 gap-1.5 rounded-md border px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          disabled={isAISubmitting}
          onClick={generateAIAnswer}
        >
          {isAISubmitting ? (
            <>
              <ReloadIcon className="mr-2 size-4 animate-spin" />
              Generando
            </>
          ) : (
            <>
              <Image
                src="/icons/stars.svg"
                alt="generar respuesta AI"
                width={12}
                height={12}
                className="object-contain"
              />
              Generar respuesta con IA
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    value={field.value}
                    editorRef={editorRef}
                    fieldChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit" className="primary-gradient w-fit">
              {isAnswering ? (
                <>
                  <ReloadIcon className="mr-2 size-4 animate-spin" />
                  Enviando
                </>
              ) : (
                "Enviar respuesta"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
