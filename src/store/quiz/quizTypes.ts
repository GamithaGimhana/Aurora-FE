export interface Question {
  _id: string;
  question: string;
  options: string[];
}

export interface QuizState {
  roomId: string | null;
  quizTitle: string;
  questions: Question[];
  answers: {
    [questionId: string]: string;
  };
  endsAt: string | null;
  started: boolean;
  submitted: boolean;
}
