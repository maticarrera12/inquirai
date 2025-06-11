import React from "react";
import DataRenderer from "../DataRenderer";
import { EMPTY_ANSWERS } from "@/constants/states";
import { P } from "pino";
import AnswerCard from "../cards/AnswerCard";

interface Props extends ActionResponse<Answer[]> {
  totalAnswers: number;
}

const AllAnswers = ({ data, success, error, totalAnswers }: Props) => {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "Respuesta" : "Respuestas"}
        </h3>
        <p>Filtros</p>
      </div>

      <DataRenderer
        data={data}
        success={success}
        error={error}
        empty={EMPTY_ANSWERS}
        render={(answer) =>
          answer.map((answer) => <AnswerCard key={answer._id} {...answer}/>)
        }
      />
    </div>
  );
};

export default AllAnswers;
