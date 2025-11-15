
import React, { useState } from 'react';
import { SocialPost } from '../types';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ResultCardProps {
  post: SocialPost;
}

const platformIcons: Record<string, React.FC<{className?: string}>> = {
  LinkedIn: LinkedInIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
};

const ResultCard: React.FC<ResultCardProps> = ({ post }) => {
  const [copied, setCopied] = useState(false);
  const IconComponent = platformIcons[post.platform];

  const handleCopy = () => {
    navigator.clipboard.writeText(post.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col transition-transform duration-300 hover:scale-105">
      <div className="relative w-full aspect-[4/3] bg-slate-700">
         <img src={post.imageUrl} alt={`Generated for ${post.platform}`} className="w-full h-full object-cover" />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {IconComponent && <IconComponent className="w-6 h-6 text-slate-400" />}
            <h2 className="text-xl font-bold text-slate-100">{post.platform}</h2>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-1.5 px-3 rounded-md transition-colors"
          >
            {copied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
        </div>
        <p className="text-slate-300 whitespace-pre-wrap text-base flex-grow">
          {post.content}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
