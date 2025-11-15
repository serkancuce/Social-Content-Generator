
import React, { useState } from 'react';
import { Tone } from '../types';

interface InputFormProps {
  onSubmit: (idea: string, tone: Tone) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState<string>('');
  const [tone, setTone] = useState<Tone>(Tone.PROFESSIONAL);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(idea, tone);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800 p-6 rounded-xl shadow-lg">
      <div>
        <label htmlFor="idea" className="block text-sm font-medium text-slate-300 mb-2">
          Your content idea
        </label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g., Launching a new AI-powered productivity app"
          rows={3}
          className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition duration-200"
          disabled={isLoading}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-300 mb-3">Choose a tone</h3>
        <div className="grid grid-cols-3 gap-3">
          {Object.values(Tone).map((t) => (
            <div key={t}>
              <input
                type="radio"
                id={t}
                name="tone"
                value={t}
                checked={tone === t}
                onChange={() => setTone(t)}
                className="sr-only peer"
                disabled={isLoading}
              />
              <label
                htmlFor={t}
                className={`flex items-center justify-center w-full p-3 rounded-md text-sm font-semibold cursor-pointer transition-all duration-200 ${
                  isLoading ? 'cursor-not-allowed bg-slate-700 text-slate-500' : 'bg-slate-700 peer-checked:bg-brand-blue peer-checked:text-white hover:bg-slate-600'
                }`}
              >
                {t}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-brand-cyan hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-bold py-3 px-4 rounded-md transition-transform duration-200 transform active:scale-95"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : 'Generate Content'}
      </button>
    </form>
  );
};

export default InputForm;
