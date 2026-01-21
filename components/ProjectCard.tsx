import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  techs: string[];
  repoLink?: string;
  deployLink?: string;
  index: number; 
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  techs, 
  repoLink, 
  deployLink,
  index 
}) => {
  return (
    <div className="project-card group relative bg-black/40 border border-white/10 p-6 hover:bg-white/5 transition-all duration-300 flex flex-col justify-between h-full">
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[1px] border-r-[1px] border-transparent group-hover:w-8 group-hover:h-8 group-hover:border-red-500 transition-all duration-500"></div>

      <div>
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
            {title}
          </h3>
          <span className="font-mono text-xs text-white/20">
            PRJ_{index.toString().padStart(2, '0')}
          </span>
        </div>

        <p className="text-sm text-gray-400 font-mono mb-6 line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {techs.map((tech, i) => (
            <span key={i} className="text-[10px] uppercase tracking-wider border border-white/10 px-2 py-1 text-gray-500 group-hover:border-red-500/30 group-hover:text-gray-300 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-auto border-t border-white/10 pt-4">
        {deployLink && (
          <a 
            href={deployLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-mono uppercase text-white hover:text-red-400 flex items-center gap-1 transition-colors"
          >
            [ LIVE_VIEW ]
          </a>
        )}
        {repoLink && (
          <a 
            href={repoLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-mono uppercase text-gray-500 hover:text-white flex items-center gap-1 transition-colors"
          >
            &lt;CODE /&gt;
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;