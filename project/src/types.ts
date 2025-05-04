export interface Trivia {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface TrueFalseQuestion {
  question: string;
  correctAnswer: boolean;
}

export interface Animal {
  id: string;
  name: string;
  category: string;
  habitat: string;
  funFact: string;
  joke: string;
  trivia: Trivia;
  diet: string;
  favoriteFood: string;
  lifespan: string;
  height: string;
  weight: string;
  trueOrFalseQuestion: TrueFalseQuestion;
}

export interface AnimalHistory {
  animal: Animal;
  viewedAt: string;
}

export interface Stats {
  animalsViewed: number;
  factsLearned: number;
  triviaAnswered: number;
}