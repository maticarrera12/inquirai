import Link from "next/link";
import React, { Suspense } from "react";
import ROUTES from "@/constants/routes";
import { hasVoted } from "@/lib/actions/vote.action";
import { cn, getTimeStamp } from "@/lib/utils";
import Preview from "../editor/Preview";
import UserAvatar from "../UserAvatar";
import Votes from "../votes/Votes";
import EditDeleteAction from "../user/EditDeleteAction";


interface Props extends Answer{
  containerClasses?: string;
  showReadMore?: boolean;
  showActionBtns?: boolean;
}
const AnswerCard = ({
  _id,
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
  question,
  containerClasses,
  showReadMore = false,
  showActionBtns = false,
}: Props) => {
  const hasVotedPromise = hasVoted({
    targetId: _id,
    targetType: "answer",
  });
  return (
    <article className={cn("light-border border-b py-10 relative", containerClasses)}>
      <span id={`answes-${_id}`} className="hash-span" />
      {
        showActionBtns && (
          <div className="background-light800 size-9 rounded-full absolute right-2 -top-2">
            <EditDeleteAction type="Answer" itemId={_id}/>
          </div>
        )
      }
      <div className="mb-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex flex-1 items-start gap-1 sm:items-center">
          <UserAvatar
            id={author._id}
            name={author.name}
            imageUrl={author.image}
            className="size-5 rounded-full object-cover max-sm:mt-0.5"
          />

          <Link
            href={ROUTES.PROFILE(author._id)}
            className="flex flex-col sm:flex-row sm:items-center max-sm:ml-1"
          >
            <p className="body-semibold text-dark300_light700">
              {author.name ?? "Anonino"}
            </p>

            <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
              <span className="max-sm:hidden">• {getTimeStamp(createdAt)}</span>
            </p>
          </Link>
        </div>
        <div className="flex justify-end">
          <Suspense fallback={<div>Cargando...</div>}>
            <Votes
              upvotes={upvotes}
              downvotes={downvotes}
              hasVotedPromise={hasVotedPromise}
              targetType="answer"
              targetId={_id}
            />
          </Suspense>
        </div>
      </div>

      <Preview content={content} />

      {
        showReadMore && (
          <Link
            href={`/questions/${question}#answers/${_id}`}
            className = 'body-semibold relative z-10 font-space-grotesk text-primary-500'
            
          >
            <p className="mt-1">Leer mas...</p>
          </Link>
        )
      }
    </article>
  );
};

export default AnswerCard;
