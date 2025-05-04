import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpDown, PawPrint, Bird, Fish } from 'lucide-react';
import ChameleonIcon from './icons/ChameleonIcon';
import FrogFaceIcon from './icons/FrogFaceIcon';
import { useAnimalContext } from '../contexts/AnimalContext';

type SortOption = 'date-desc' | 'date-asc' | 'name-asc' | 'name-desc';

const HistoryList: React.FC = () => {
  const { history } = useAnimalContext();
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <p className="text-gray-600 mb-4">You haven't viewed any animals yet!</p>
        <p className="text-gray-500">Click on an animal card to learn more about them.</p>
      </div>
    );
  }

  const getSortedHistory = () => {
    return [...history].sort((a, b) => {
      if (sortOption === 'date-desc') {
        return new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime();
      } else if (sortOption === 'date-asc') {
        return new Date(a.viewedAt).getTime() - new Date(b.viewedAt).getTime();
      } else if (sortOption === 'name-asc') {
        return a.animal.name.localeCompare(b.animal.name);
      } else {
        return b.animal.name.localeCompare(a.animal.name);
      }
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mammals': return 'bg-rose-100 text-rose-700';
      case 'birds': return 'bg-amber-100 text-amber-700';
      case 'reptiles': return 'bg-emerald-100 text-emerald-700';
      case 'amphibians': return 'bg-teal-100 text-teal-700';
      case 'fish': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconProps = { className: 'w-8 h-8' };
    switch (category.toLowerCase()) {
      case 'mammals':
        return <PawPrint {...iconProps} />;
      case 'birds':
        return <Bird {...iconProps} />;
      case 'reptiles':
        return <ChameleonIcon className={iconProps.className} />;
      case 'amphibians':
        return <FrogFaceIcon className={iconProps.className} />;
      case 'fish':
        return <Fish {...iconProps} />;
      default:
        return <PawPrint {...iconProps} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-indigo-700">Your Animal History</h2>
        
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-indigo-600" />
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="bg-white px-3 py-1 rounded border border-indigo-200 text-indigo-700 text-sm"
          >
            <option value="date-desc">Latest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
          </select>
        </div>
      </div>
      
      <ul className="divide-y divide-gray-100">
        {getSortedHistory().map((item) => (
          <li key={`${item.animal.id}-${item.viewedAt}`} className="p-4 hover:bg-gray-50 transition-colors">
            <Link to={`/animal/${item.animal.id}`} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryColor(item.animal.category)}`}>
                {getCategoryIcon(item.animal.category)}
              </div>
              
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-gray-800">{item.animal.name}</h3>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(item.animal.category)}`}>
                  {item.animal.category}
                </span>
              </div>
              
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDate(item.viewedAt)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;