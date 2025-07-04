import Image from "next/image";
import { formatNumber } from "@/lib/utils";

interface Props {
  totalAnswers: number;
  totalQuestions: number;
  badges: Badges;
  reputationPoints: number;
}

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => (
  <div className="light-border background-light900_dark300 text-center flex flex-col items-center justify-center gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
    <Image src={imgUrl} alt={title} width={40} height={50} />
    <div>
      <p className="paragraph-semibold text-dark200_light900">{value}</p>
      <p className="body-medium text-dark300_light700">{title}</p>
    </div>
  </div>
);

const Stats = ({ totalAnswers, totalQuestions, badges, reputationPoints }: Props) => {
  return (
    <div className="mt-3">
      <h4 className="h3-semibold text-dark200_light900">Estadisticas{" "}
        <span className="small-semibold primary-text-gradient">
          {formatNumber(reputationPoints)} 
        </span>
      </h4>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        <div className="light-border text-center background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300  dark:shadow-dark-200">
          <div >
            <p className="paragraph-semibold  text-dark200_light900">
              {formatNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400_light700">Preguntas</p>
          </div>
          <div >
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400_light700">Respuestas</p>
          </div>
        </div>

        <StatsCard
          imgUrl="/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Medallas de Oro"
        />
        <StatsCard
          imgUrl="/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Medallas de Plata"
        />
        <StatsCard
          imgUrl="/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Medallas de Bronce"
        />
      </div>
    </div>
  );
};

export default Stats;
