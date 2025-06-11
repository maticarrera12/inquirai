"use server"

import Answer, { IAnswerDoc } from "@/database/asnwer.model";
import { AnswerServerSchema } from "../validations";
import action from "../handlers/action";
import handleError from "../handlers/error";
import mongoose from "mongoose";
import { Question } from "@/database";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constants/routes";

export async function createAnswer(
    params: createAnswerParams
): Promise<ActionResponse<IAnswerDoc>>{
    const validationResult = await action({
        params,
        schema: AnswerServerSchema,
        authorize: true,
    });

    if(validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const {content, questionId} = validationResult.params!;
    const userId = validationResult?.session?.user?.id;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const question = await Question.findById(questionId)
        if(!question)  throw new Error("Pregunta no encontrada");
        const [newAnswer] = await Answer.create([{
            author : userId,
            content,
            question: questionId,
        }],{session}) 

        if(!newAnswer) throw new Error("No se pudo crear la respuesta");

        question.answers += 1;
        await question.save({session});
        await session.commitTransaction();

        revalidatePath(ROUTES.QUESTION(questionId));

        return{
            success:true,
            data: JSON.parse(JSON.stringify(newAnswer)), 
        }
    }catch (error) {
        await session.abortTransaction();
        return handleError(error) as ErrorResponse;
    }finally {
        await session.endSession();
    }


}