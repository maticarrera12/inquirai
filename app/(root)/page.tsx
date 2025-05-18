import { auth} from "@/auth";

import ROUTES from "@/constants/routes";


const Home = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <h1 className="h1-bold font-space-grotesk">Tailwind CSS is FUN!!</h1>
    </div>
  );
};

export default Home;


