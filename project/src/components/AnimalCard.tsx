import React from 'react';
import { PawPrint, Bird, Fish } from 'lucide-react';
import { Animal } from '../types';
import ChameleonIcon from './icons/ChameleonIcon';
import FrogFaceIcon from './icons/FrogFaceIcon';

interface AnimalCardProps {
  animal: Animal;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  const getCategoryColor = (category: string) => {
    // Normalize category to handle case sensitivity
    const normalizedCategory = category.toLowerCase();
    console.log('Category:', category, 'Normalized:', normalizedCategory);
    
    const colors = {
      'mammals': {
        background: 'bg-rose-100',
        text: 'text-rose-700'
      },
      'birds': {
        background: 'bg-amber-100',
        text: 'text-amber-700'
      },
      'reptiles': {
        background: 'bg-emerald-100',
        text: 'text-emerald-700'
      },
      'amphibians': {
        background: 'bg-teal-100',
        text: 'text-teal-700'
      },
      'fish': {
        background: 'bg-blue-100',
        text: 'text-blue-700'
      }
    };
    
    const result = colors[normalizedCategory] || { background: 'bg-gray-100', text: 'text-gray-700' };
    console.log('Color result:', result);
    return result;
  };

  const getCategoryIcon = (category: string) => {
    // Normalize category to handle case sensitivity
    const normalizedCategory = category.toLowerCase();
    console.log('Getting icon for category:', normalizedCategory);
    
    const iconSize = 'w-24 h-24';
    
    switch (normalizedCategory) {
      case 'mammals':
        return <PawPrint className={iconSize} />;
      case 'birds':
        return <Bird className={iconSize} />;
      case 'reptiles':
        return <ChameleonIcon className={iconSize} />;
      case 'amphibians':
        return <FrogFaceIcon className={iconSize} />;
      case 'fish':
        return <Fish className={iconSize} />;
      default:
        console.log('No matching icon found, using default PawPrint');
        return <PawPrint className={iconSize} />;
    }
  };

  console.log('Rendering AnimalCard for:', animal.name, 'Category:', animal.category);
  const colors = getCategoryColor(animal.category);

  return (
    <div className={`${colors.background} rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full`}>
      <div className={`aspect-square flex items-center justify-center ${colors.text}`}>
        {getCategoryIcon(animal.category)}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{animal.name}</h2>
        <p className={`text-sm font-medium ${colors.text}`}>{animal.category}</p>
      </div>
    </div>
  );
};

export default AnimalCard;