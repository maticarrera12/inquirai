interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface Question {
  _id: string;
  title: string;
  tags: Tag[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  answers: number;
  views: number;
  content: string;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };
type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<
  SuccessResponse<T> | ErrorResponse<T>
>;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

interface Answer {
  _id: string;
  content: string;
  author: Author;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  username: string;
  bio?: string;
  image?: string;
  location?: string;
  porfolio?: string;
  reputation?: number;
}

interface Collection {
  _id: string;
  author: string | Author;
  question: Question;
}
