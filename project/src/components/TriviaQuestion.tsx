import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Trivia } from '../types';

interface TriviaQuestionProps {
  question: Trivia;
  onAnswer: (isCorrect: boolean) => void;
}

const TriviaQuestion: React.FC<TriviaQuestionProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const handleAnswerClick = (answer: string) => {
    if (!showResult) {
      setSelectedAnswer(answer);
      setShowResult(true);
      onAnswer(answer === question.correctAnswer);
    }
  };
  
  const getButtonStyle = (answer: string) => {
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
      
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={showResult}
            className={`w-full py-3 px-4 rounded-lg border text-left flex items-center justify-between transition-colors ${getButtonStyle(option)}`}
          >
            <span>{option}</span>
            {showResult && option === question.correctAnswer && (
              <Check className="h-5 w-5 text-green-600" />
            )}
            {showResult && selectedAnswer === option && option !== question.correctAnswer && (
              <X className="h-5 w-5 text-red-600" />
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
              <span>Oops! The correct answer is: {question.correctAnswer}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TriviaQuestion;