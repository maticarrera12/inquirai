import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

  const questions = [
    {_id: "1", title: "Como aprender react?", description:"Quiero aprender React, alguien puede ayudarme en donde empezar?", tags:[
      {_id:'1', name:"React"},
      {_id:'2', name:"Javascript"},
    ],
  author:{_id:"1", name: "John Doe"},
  upvotes: 10,
  answers: 5,
  views: 100,
  createdAt: new Date()
},
    {_id: "2", title: "Como aprender Javascript?", description:"Quiero aprender React, alguien puede ayudarme en donde empezar?", tags:[
      {_id:'1', name:"React"},
      {_id:'2', name:"Javascript"},
    ],
  author:{_id:"1", name: "John Doe"},
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

  const {query = ""} = await searchParams

  const filteredQuestions = questions.filter((question)=> question.title.toLowerCase().includes(query?.toLowerCase()))

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

      <div className="mt-10 flex w-full flex-col gap-6">
      {
        filteredQuestions.map((question)=>(
          <h1 key={question._id}>{question.title}</h1>
        ))
      }
      </div>
    </>
  );
};

export default Home;
