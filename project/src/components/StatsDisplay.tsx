import React from 'react';
import { Eye, Brain, Award, RefreshCw } from 'lucide-react';
import { useStats } from '../contexts/StatsContext';

const StatsDisplay: React.FC = () => {
  const { stats, resetStats } = useStats();

  return (
    <div className="space-y-4 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4">
          <div className="bg-indigo-100 p-3 rounded-full">
            <Eye className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Animals Viewed</p>
            <p className="text-2xl font-bold text-indigo-600">{stats.animalsViewed}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-full">
            <Brain className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Facts Learned</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.factsLearned}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4">
          <div className="bg-amber-100 p-3 rounded-full">
            <Award className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Trivia Answered</p>
            <p className="text-2xl font-bold text-amber-600">{stats.triviaAnswered}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={resetStats}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Reset Stats
        </button>
      </div>
    </div>
  );
};

export default StatsDisplay;