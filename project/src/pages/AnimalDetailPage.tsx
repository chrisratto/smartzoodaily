import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Info, Lightbulb, HelpCircle, Search } from 'lucide-react';
import TriviaQuestion from '../components/TriviaQuestion';
import { useAnimalContext } from '../contexts/AnimalContext';

const AnimalDetailPage: React.FC = () => {
  const { animalId } = useParams<{ animalId: string }>();
  const navigate = useNavigate();
  const { findAnimal, addToHistory } = useAnimalContext();
  
  const animal = findAnimal(animalId || '');
  
  React.useEffect(() => {
    if (animal) {
      addToHistory(animal);
    }
  }, [animal, addToHistory]);

  if (!animal) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-500">Animal not found!</h2>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
        >
          Go Back Home
        </button>
      </div>
    );
  }
  
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mammals': return {
        background: 'bg-rose-100', 
        text: 'text-rose-700'
      };
      case 'birds': return {
        background: 'bg-amber-100', 
        text: 'text-amber-700'
      };
      case 'reptiles': return {
        background: 'bg-emerald-100', 
        text: 'text-emerald-700'
      };
      case 'amphibians': return {
        background: 'bg-teal-100', 
        text: 'text-teal-700'
      };
      case 'fish': return {
        background: 'bg-blue-100', 
        text: 'text-blue-700'
      };
      default: return {
        background: 'bg-gray-100', 
        text: 'text-gray-700'
      };
    }
  };

  const colors = getCategoryColor(animal.category);

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
        <span>Back to Home</span>
      </button>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
        <div className={`${colors.background} p-8`}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{animal.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.text}`}>
                {animal.category}
              </span>
            </div>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(animal.name)}&tbm=isch`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow transition-shadow"
            >
              <Search className="h-4 w-4" />
              <span>Find Images</span>
            </a>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-indigo-50 p-4 rounded-lg flex items-start gap-4">
                <MapPin className="h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-indigo-700 mb-1">Habitat</h3>
                  <p className="text-gray-700">{animal.habitat}</p>
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-4">
                <Lightbulb className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-700 mb-1">Fun Fact</h3>
                  <p className="text-gray-700">{animal.funFact}</p>
                </div>
              </div>
              
              <div className="bg-emerald-50 p-4 rounded-lg flex items-start gap-4">
                <HelpCircle className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-emerald-700 mb-1">Funny Joke</h3>
                  <p className="text-gray-700">{animal.joke}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-700 mb-3">Trivia Question</h3>
                <TriviaQuestion 
                  question={animal.trivia}
                  onAnswer={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailPage;