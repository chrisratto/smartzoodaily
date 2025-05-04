import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { TrueFalseQuestion as TrueFalseQuestionType } from '../types';

interface TrueFalseQuestionProps {
  question: TrueFalseQuestionType;
  onAnswer: (isCorrect: boolean) => void;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);

  // If no question is provided, don't render anything
  if (!question) {
    return null;
  }

  const handleAnswerClick = (answer: boolean) => {
    if (!showResult) {
      setSelectedAnswer(answer);
      setShowResult(true);
      onAnswer(answer === question.correctAnswer);
    }
  };

  const getButtonStyle = (answer: boolean) => {
    if (!showResult) {
      return 'bg-white hover:bg-purple-50 text-gray-700 border-gray-200';
    }

    if (answer === question.correctAnswer) {
      return 'bg-green-100 text-green-700 border-green-300'; // Always highlight correct answer
    }

    if (selectedAnswer === answer) {
      return 'bg-red-100 text-red-700 border-red-300'; // Show red for wrong selected answer
    }

    return 'bg-white text-gray-500 border-gray-200 opacity-70';
  };

  return (
    <div>
      <p className="text-gray-700 mb-4">{question.question}</p>

      <div className="flex gap-2">
        {[true, false].map((answer) => (
          <button
            key={answer.toString()}
            onClick={() => handleAnswerClick(answer)}
            disabled={showResult}
            className={`flex-1 py-3 px-4 rounded-lg border text-center transition-colors ${getButtonStyle(answer)}`}
          >
            {answer ? 'True' : 'False'}
            {showResult && answer === question.correctAnswer && (
              <Check className="inline-block ml-2 h-5 w-5 text-green-600" />
            )}
            {showResult && selectedAnswer === answer && answer !== question.correctAnswer && (
              <X className="inline-block ml-2 h-5 w-5 text-red-600" />
            )}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`mt-4 p-3 rounded-lg ${selectedAnswer === question.correctAnswer ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {selectedAnswer === question.correctAnswer ? (
            <p className="flex items-center gap-2">
              <Check className="h-5 w-5" />
              <span>Correct! Great job!</span>
            </p>
          ) : (
            <p className="flex items-center gap-2">
              <X className="h-5 w-5" />
              <span>Oops! The correct answer is: {question.correctAnswer ? 'True' : 'False'}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TrueFalseQuestion;