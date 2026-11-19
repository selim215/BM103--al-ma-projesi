import React from 'react';

interface YoutubeVideoLinkProps {
  url: string;
  title?: string;
  variant?: 'default' | 'hero' | 'compact';
  className?: string;
}

export const YoutubeLogoIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`shrink-0 ${className}`}
  >
    <path
      fill="#FF0000"
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
    />
    <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const YoutubeVideoLink: React.FC<YoutubeVideoLinkProps> = ({
  url,
  title,
  variant = 'default',
  className = '',
}) => {
  const styles =
    variant === 'hero'
      ? 'border border-[#F3D2AF]/30 bg-white/10 text-[#F8EADC] hover:bg-white/20 px-3.5 py-2 text-xs font-bold rounded-lg'
      : variant === 'compact'
      ? 'border border-red-200 bg-red-50/90 text-[#09251C] hover:border-red-300 hover:bg-red-100 px-2.5 py-1 text-[11px] font-bold rounded'
      : 'border border-red-200 bg-white text-[#09251C] hover:border-red-300 hover:bg-red-50 px-2.5 py-1 text-[11px] font-bold rounded';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={title ? `YouTube: ${title}` : 'YouTube — Konunun Videosu'}
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap transition-colors ${styles} ${className}`}
    >
      <YoutubeLogoIcon className={variant === 'hero' ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
      <span>Konunun Videosu</span>
    </a>
  );
};
