import axios from 'axios';
import { Animal, Trivia, TrueFalseQuestion } from '../types';

const API_KEY = 'tQ5aVKLmbthNH/VF1ZWnyA==MQnwvT0LclF267ZQ';
const BASE_URL = 'https://api.api-ninjas.com/v1/animals';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json'
  }
});

export const fetchAnimals = async (name: string) => {
  try {
    const response = await api.get('', { params: { name } });
    return response.data;
  } catch (error) {
    console.error('Error fetching animal data:', error);
    throw error;
  }
};

const mapAnimalClass = (taxonomyClass: string): string => {
  // Normalize the input to handle case sensitivity
  const normalizedClass = taxonomyClass.toLowerCase();
  
  const classMap: Record<string, string> = {
    'mammalia': 'Mammals',
    'aves': 'Birds',
    'reptilia': 'Reptiles',
    'amphibia': 'Amphibians',
    'chondrichthyes': 'Fish',
    'actinopterygii': 'Fish',
    'osteichthyes': 'Fish'
  };

  console.log('Mapping taxonomy class:', taxonomyClass, 'to category:', classMap[normalizedClass] || 'Mammals');
  return classMap[normalizedClass] || 'Mammals';
};

export const generateTrueFalseQuestion = (animal: any): TrueFalseQuestion => {
  const questions = [
    {
      question: `${animal.name} is a ${animal.characteristics.diet?.toLowerCase()} animal.`,
      correctAnswer: true
    },
    {
      question: `${animal.name} typically lives up to ${animal.characteristics.lifespan} years.`,
      correctAnswer: true
    },
    {
      question: `${animal.name} is not found in ${animal.locations?.[0] || 'its natural habitat'}.`,
      correctAnswer: false
    }
  ];

  return questions[Math.floor(Math.random() * questions.length)];
};

export const generateMultipleChoice = (animal: any): Trivia => {
  const questions = [
    {
      question: `What is the typical diet of ${animal.name}?`,
      options: ['Herbivore', 'Carnivore', 'Omnivore', 'Insectivore'],
      correctAnswer: animal.characteristics.diet || 'Omnivore'
    },
    {
      question: `Where can you find ${animal.name} in the wild?`,
      options: [...(animal.locations?.slice(0, 3) || []), 'Antarctica'],
      correctAnswer: animal.locations?.[0] || animal.characteristics.habitat || 'Various locations'
    }
  ];

  return questions[Math.floor(Math.random() * questions.length)];
};

export const transformApiData = (apiAnimal: any): Animal => {
  return {
    id: apiAnimal.name.toLowerCase().replace(/\s+/g, '-'),
    name: apiAnimal.name,
    category: mapAnimalClass(apiAnimal.taxonomy.class),
    habitat: apiAnimal.characteristics.habitat || 'Various habitats',
    diet: apiAnimal.characteristics.diet || 'Unknown',
    favoriteFood: apiAnimal.characteristics.favorite_food || 'Various foods',
    lifespan: apiAnimal.characteristics.lifespan || 'Unknown',
    height: apiAnimal.characteristics.height || 'Unknown',
    weight: apiAnimal.characteristics.weight || 'Unknown',
    funFact: apiAnimal.characteristics.slogan || `The ${apiAnimal.name} is a fascinating creature!`,
    joke: `Why did the ${apiAnimal.name} cross the road? To get to the wild side!`,
    trivia: generateMultipleChoice(apiAnimal),
    trueOrFalseQuestion: generateTrueFalseQuestion(apiAnimal)
  };
};