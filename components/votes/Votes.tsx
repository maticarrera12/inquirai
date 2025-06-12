"use client";
import { createVote } from "@/lib/actions/vote.action";
import { formatNumber } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { use, useState } from "react";
import { toast } from "sonner";

interface Props {
  targetId: string;
  targetType: "question" | "answer";
  upvotes: number;
  downvotes: number;
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>
}
const Votes = ({ upvotes, downvotes, hasVotedPromise, targetId, targetType}: Props) => {
  const session = useSession();
  const userId = session.data?.user?.id;
  const {success, data} = use(hasVotedPromise);
  const [isLoading, setIsLoading] = useState(false);

  const { hasUpvoted, hasDownvoted } = data || {}

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if(!userId) {
      return toast.error("Debes iniciar sesión para votar");
    }

    setIsLoading(true);

    try {
      const result = await createVote({
        targetId,
        targetType,
        voteType,
      })

      if(!result.success){
        return toast.error("Error al votar, por favor intenta de nuevo", {
          description: result.error?.message || "Error desconocido",
          duration: 3000,
        });
      }
      const successMessage =
      voteType === 'upvote' 
      ? `upvote ${!hasUpvoted ? 'agregado' : 'Removido'}` 
      : `downvote ${!hasDownvoted ? 'agregado' : 'Removido'}`;

      toast.success("Tu voto ha sido registrado", {
        description: successMessage,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error al votar, por favor intenta de nuevo",{
        description: (error as Error).message || "Error desconocido",
        duration: 3000,
      });
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={success && hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
          width={18}
          height={18}
          alt="upvote icon"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          aria-label="upvote icon"
          onClick={() => !isLoading && handleVote("upvote")}
        />
        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(upvotes)}
          </p>
        </div>
      </div>
      <div className="flex-center gap-1.5">
        <Image
          src={success && hasDownvoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
          width={18}
          height={18}
          alt="downvote icon"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          aria-label="downvote icon"
          onClick={() => !isLoading && handleVote("downvote")}
        />
        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">
            {formatNumber(downvotes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
