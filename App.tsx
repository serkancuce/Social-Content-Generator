
import React, { useState, useCallback } from 'react';
import { generateSocialPosts } from './services/geminiService';
import { Tone, SocialPost } from './types';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import { SparkleIcon } from './components/icons/SparkleIcon';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [results, setResults] = useState<SocialPost[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (idea: string, tone: Tone) => {
    if (!idea.trim()) {
      setError('Please enter an idea.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const generatedPosts = await generateSocialPosts(idea, tone);
      setResults(generatedPosts);
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <SparkleIcon className="w-8 h-8 text-brand-cyan" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brand-blue to-brand-cyan text-transparent bg-clip-text">
              Social Content Generator
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Enter an idea, pick a tone, and let AI craft tailored posts with unique images for LinkedIn, Twitter/X, and Instagram.
          </p>
        </header>

        <div className="max-w-3xl mx-auto mb-12">
          <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>

        {error && (
          <div className="text-center bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg max-w-3xl mx-auto">
            <p>{error}</p>
          </div>
        )}

        {isLoading && <LoadingSpinner />}

        {!isLoading && !results && !error && (
            <div className="text-center text-slate-500 py-16">
                <p>Your generated content will appear here.</p>
            </div>
        )}

        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {results.map((post) => (
              <ResultCard key={post.platform} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
