import { useState } from "react";

interface EventImage {
  src: string;
  alt: string;
  description?: string;
}

interface EventImageCardProps {
  image: EventImage;
  onImageClick?: (image: EventImage) => void;
  className?: string;
  aspectRatio?: string;
}

export const EventImageCard = ({ image, onImageClick, className = "", aspectRatio = "aspect-square" }: EventImageCardProps) => {
  const handleClick = () => {
    if (onImageClick) {
      onImageClick(image);
    }
  };

  return (
    <div
      className={`relative ${aspectRatio || ''} overflow-hidden rounded-xl cursor-pointer group ${className}`}
      onClick={handleClick}
      style={{ boxShadow: '0 6px 18px rgba(10,22,38,0.08)' }}
    >
      <div className="absolute inset-0 bg-[#222D3B] border border-[#3B4451] group-hover:border-[#2E8BFF] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-500">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Text overlay always visible - bottom left */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1626]/90 via-transparent to-transparent flex items-end">
            <div className="p-4 md:p-6 text-left">
              <p className="text-white text-base md:text-lg font-bold uppercase tracking-wider mb-1">
                {image.alt}
              </p>
              {image.description && (
                <p className="text-white/90 text-xs md:text-sm leading-relaxed font-normal">
                  {image.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

