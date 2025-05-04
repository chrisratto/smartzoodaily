import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useAnimalContext } from '../contexts/AnimalContext';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({ 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  });
  const { refreshAnimals } = useAnimalContext();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      
      const difference = midnight.getTime() - now.getTime();
      
      if (difference <= 0) {
        // It's midnight, refresh animals
        refreshAnimals();
        return { hours: 24, minutes: 0, seconds: 0 };
      }
      
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Check if it's midnight
      if (newTimeLeft.hours === 24 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        refreshAnimals();
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [refreshAnimals]);

  const formatTime = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white px-6 py-4 rounded-full shadow-md flex items-center gap-3">
        <Clock className="h-5 w-5 text-indigo-600" />
        <span className="text-lg font-medium text-gray-700">
          New animals in: {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;