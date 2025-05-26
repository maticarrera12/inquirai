import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { api } from "@/lib/api";
import handleError from "@/lib/handler/error";
import Link from "next/link";

  const questions = [
    {_id: "1", title: "Como aprender react?", description:"Quiero aprender React, alguien puede ayudarme en donde empezar?", tags:[
      {_id:'1', name:"React"},
    ],
  author:{_id:"1", name: "John Doe", image: "https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740"},
  upvotes: 10,
  answers: 5,
  views: 100,
  createdAt: new Date()
},
    {_id: "2", title: "Como aprender Javascript?", description:"Quiero aprender React, alguien puede ayudarme en donde empezar?", tags:[
      {_id:'2', name:"Javascript"},
    ],
  author:{_id:"1", name: "Jane Doe", image: "https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740"},
  upvotes: 10,
  answers: 5,
  views: 100,
  createdAt: new Date()
},

  ]
  interface SearchParams{
    searchParams: Promise<{[key:string]: string}>
  }

const Home = async ({searchParams}: SearchParams) => {

  const session = await auth()
  console.log("Session:", session)

  const {query = "", filter = ""} = await searchParams

  const filteredQuestions = questions.filter((question)=> {
    const matchesQuery =  question.title
  .toLowerCase()
  .includes(query?.toLowerCase())
    const matchesFilter = filter ? question.tags[0].name.toLowerCase() === filter.toLowerCase() : true;

    return matchesQuery && matchesFilter
})

  return (
    <>
      <section className="flex flex-col-reverse sm:flex-row justify-between gap-4 sm:flex-grow sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Preguntas</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Haz una pregunta</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
        route="/" 
        imgSrc='/icons/search.svg' 
        placeholder='Encuentra preguntas' 
        otherClasses="flex-1"/>
      </section>
      <HomeFilter/>
      <div className="mt-10 flex w-full flex-col gap-6">
      {
        filteredQuestions.map((question)=>(
          <QuestionCard key={question._id} question={question}/>
        ))
      }
      </div>
    </>
  );
};

export default Home;
