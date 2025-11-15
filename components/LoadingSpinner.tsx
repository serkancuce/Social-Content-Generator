
import React, { useState, useEffect } from 'react';
import { SparkleIcon } from './icons/SparkleIcon';

const messages = [
  "Warming up the AI creativity engine...",
  "Generating brilliant ideas...",
  "Crafting the perfect words...",
  "Designing stunning visuals...",
  "Almost there, polishing the final details...",
];

export const LoadingSpinner: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-4 text-center my-12">
            <div className="relative">
                <div className="w-20 h-20 border-4 border-slate-700 rounded-full"></div>
                <div className="w-20 h-20 border-4 border-brand-cyan rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                <SparkleIcon className="w-8 h-8 text-brand-cyan absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-slate-400 font-medium transition-opacity duration-500">{messages[messageIndex]}</p>
        </div>
    );
};
