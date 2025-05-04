import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Animal, AnimalHistory } from '../types';
import { fetchAnimals, transformApiData } from '../services/api';

interface AnimalContextType {
  dailyAnimals: Animal[];
  history: AnimalHistory[];
  findAnimal: (id: string) => Animal | undefined;
  addToHistory: (animal: Animal) => void;
  refreshAnimals: () => void;
}

const AnimalContext = createContext<AnimalContextType | undefined>(undefined);

export const useAnimalContext = () => {
  const context = useContext(AnimalContext);
  if (context === undefined) {
    throw new Error('useAnimalContext must be used within an AnimalProvider');
  }
  return context;
};

interface AnimalProviderProps {
  children: React.ReactNode;
}

const ANIMAL_NAMES = {
  Mammals: ['Lion', 'Elephant', 'Tiger', 'Giraffe', 'Zebra', 'Gorilla', 'Kangaroo', 'Dolphin'],
  Birds: ['Eagle', 'Parrot', 'Penguin', 'Owl', 'Falcon', 'Peacock', 'Flamingo', 'Hummingbird'],
  Reptiles: ['Python', 'Iguana', 'Chameleon', 'Cobra', 'Turtle', 'Gecko', 'Crocodile', 'Komodo Dragon'],
  Amphibians: ['Salamander', 'Frog', 'Axolotl', 'Newt', 'Toad', 'Tree Frog', 'Fire Salamander'],
  Fish: ['Shark', 'Clownfish', 'Stingray', 'Tuna', 'Salmon', 'Angelfish', 'Barracuda', 'Seahorse']
};

export const AnimalProvider: React.FC<AnimalProviderProps> = ({ children }) => {
  const [dailyAnimals, setDailyAnimals] = useState<Animal[]>([]);
  const [history, setHistory] = useState<AnimalHistory[]>([]);

  useEffect(() => {
    try {
      const storedDailyAnimals = localStorage.getItem('dailyAnimals');
      const storedHistory = localStorage.getItem('animalHistory');
      const lastUpdated = localStorage.getItem('lastUpdated');
      
      const shouldRefresh = !lastUpdated || isNewDay(new Date(lastUpdated));
      
      if (storedDailyAnimals && !shouldRefresh) {
        setDailyAnimals(JSON.parse(storedDailyAnimals));
      } else {
        fetchDailyAnimals();
      }
      
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading data from localStorage', error);
      fetchDailyAnimals();
    }
  }, []);

  const isNewDay = (lastDate: Date): boolean => {
    const today = new Date();
    return (
      today.getDate() !== lastDate.getDate() ||
      today.getMonth() !== lastDate.getMonth() ||
      today.getFullYear() !== lastDate.getFullYear()
    );
  };

  const getRandomAnimal = (category: keyof typeof ANIMAL_NAMES): string => {
    const animals = ANIMAL_NAMES[category];
    return animals[Math.floor(Math.random() * animals.length)];
  };

  const fetchDailyAnimals = async () => {
    try {
      const categories = Object.keys(ANIMAL_NAMES) as (keyof typeof ANIMAL_NAMES)[];
      const selectedAnimals: Animal[] = [];
      const usedCategories = new Set<string>();

      // Process animals sequentially to ensure category uniqueness
      for (const category of categories) {
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
          const animalName = getRandomAnimal(category);
          const response = await fetchAnimals(animalName);
          
          if (response && response[0]) {
            const transformedAnimal = transformApiData(response[0]);
            const normalizedCategory = transformedAnimal.category.toLowerCase();

            if (!usedCategories.has(normalizedCategory)) {
              selectedAnimals.push(transformedAnimal);
              usedCategories.add(normalizedCategory);
              break;
            }
          }
          attempts++;
        }
      }

      // Only update if we have animals from different categories
      if (selectedAnimals.length > 0) {
        setDailyAnimals(selectedAnimals);
        localStorage.setItem('dailyAnimals', JSON.stringify(selectedAnimals));
        localStorage.setItem('lastUpdated', new Date().toISOString());
      }
    } catch (error) {
      console.error('Error fetching daily animals:', error);
    }
  };

  const findAnimal = (id: string): Animal | undefined => {
    return dailyAnimals.find(animal => animal.id === id);
  };

  const addToHistory = (animal: Animal) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const alreadyViewed = history.some(item => 
      item.animal.id === animal.id && 
      new Date(item.viewedAt) >= todayStart
    );
    
    if (!alreadyViewed) {
      const newHistoryItem: AnimalHistory = {
        animal,
        viewedAt: new Date().toISOString()
      };
      
      setHistory(prev => [newHistoryItem, ...prev]);
      localStorage.setItem('animalHistory', JSON.stringify([newHistoryItem, ...history]));
    }
  };

  const refreshAnimals = useCallback(() => {
    fetchDailyAnimals();
  }, []);

  return (
    <AnimalContext.Provider value={{ 
      dailyAnimals, 
      history, 
      findAnimal, 
      addToHistory,
      refreshAnimals
    }}>
      {children}
    </AnimalContext.Provider>
  );
};