import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint as Paw } from 'lucide-react';
import AnimalCard from '../components/AnimalCard';
import CountdownTimer from '../components/CountdownTimer';
import { useAnimalContext } from '../contexts/AnimalContext';

const HomePage: React.FC = () => {
  const { dailyAnimals } = useAnimalContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Paw className="h-10 w-10 text-indigo-600" />
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600">SmartZoo Daily</h1>
        </div>
        <p className="text-lg text-gray-600">Discover amazing animals every day!</p>
      </header>

      <CountdownTimer />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12 justify-items-center">
        {dailyAnimals.map((animal) => (
          <Link to={`/animal/${animal.id}`} key={animal.id} className="w-full max-w-[90%] sm:max-w-none">
            <AnimalCard animal={animal} />
          </Link>
        ))}
      </div>

      <footer className="py-4 text-center text-gray-600 border-t">
        Created by{" "}
        <a 
          href="https://brightbuildstudio.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-indigo-600 transition-colors"
        >
          BrightBuild Studio
        </a>
      </footer>
    </div>
  );
};

export default HomePage;