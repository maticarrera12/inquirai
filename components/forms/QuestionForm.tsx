"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ROUTES from "@/constants/routes";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { AskQuestionSchema } from "@/lib/validations";
import TagCard from "../cards/TagCard";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

interface Params {
  question?: Question;
  isEdit?: boolean;
}

const QuestionForm = ({ question, isEdit = false }: Params) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 20) {
        form.setError("tags", {
          type: "manual",
          message: "Los tag deben contener menos de 20 caracteres",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "El tag ya existe",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);

    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Los tag son requeridos",
      });
    }
  };

  const handleCreateQuestion = async (
    data: z.infer<typeof AskQuestionSchema>
  ) => {
    startTransition(async () => {
      if (isEdit && question) {
        const result = await editQuestion({
          questionId: question._id,
          ...data,
        });
        if (result.success) {
          toast.success("Pregunta editada con éxito", {
            description: "Tu pregunta ha sido editada.",
            duration: 3000,
          });

          if (result.data) router.push(ROUTES.QUESTION(result.data._id));
        } else {
          toast.error(`Error ${result.status}`, {
            description:
              result.error?.message ||
              "Ocurrió un error al editar la pregunta.",
          });
        }

        return;
      }
      const result = await createQuestion(data);

      if (result.success) {
        toast.success("Pregunta creada con éxito", {
          description: "Tu pregunta ha sido creada.",
          duration: 3000,
        });

        if (result.data) router.push(ROUTES.QUESTION(result.data._id));
      } else {
        toast.error(`Error ${result.status}`, {
          description:
            result.error?.message || "Ocurrió un error al crear la pregunta.",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Titulo de la pregunta{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark-300_light700 no-focus min-h-[56px]
                              border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Se especifico e imagina que le estas haciendo la pregunta a otra
                persona.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detalla tu pregunta <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5"></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className="paragraph-regular background-light700_dark300 light-border-2 text-dark-300_light700 no-focus min-h-[56px]
                              border"
                    placeholder="Agrega tags"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                      {field?.value?.map((tag: string) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          isButton
                          compact
                          remove
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="body-regular text-light-500 mt-2.5">
                Agrega hasta 5 tags para describir sobre qué es tu pregunta.
                Necesitas presionar enter después de cada tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 size-4 animate-spin" />
                <span>Enviando</span>
              </>
            ) : (
              <>{isEdit ? "Editar pregunta" : "Crear pregunta"} </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
