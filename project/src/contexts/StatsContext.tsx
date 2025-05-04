import React, { createContext, useContext, useState, useEffect } from 'react';
import { Stats } from '../types';

interface StatsContextType {
  stats: Stats;
  incrementAnimalsViewed: () => void;
  incrementFactsLearned: () => void;
  incrementTriviaAnswered: () => void;
  resetStats: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Stats>({
    animalsViewed: 0,
    factsLearned: 0,
    triviaAnswered: 0
  });

  useEffect(() => {
    localStorage.setItem('animalStats', JSON.stringify(stats));
  }, [stats]);

  const incrementAnimalsViewed = () => {
    setStats(prev => ({ ...prev, animalsViewed: prev.animalsViewed + 1 }));
  };

  const incrementFactsLearned = () => {
    setStats(prev => ({ ...prev, factsLearned: prev.factsLearned + 1 }));
  };

  const incrementTriviaAnswered = () => {
    setStats(prev => ({ ...prev, triviaAnswered: prev.triviaAnswered + 1 }));
  };

  const resetStats = () => {
    setStats({
      animalsViewed: 0,
      factsLearned: 0,
      triviaAnswered: 0
    });
    localStorage.removeItem('animalStats');
  };

  return (
    <StatsContext.Provider value={{
      stats,
      incrementAnimalsViewed,
      incrementFactsLearned,
      incrementTriviaAnswered,
      resetStats
    }}>
      {children}
    </StatsContext.Provider>
  );
};