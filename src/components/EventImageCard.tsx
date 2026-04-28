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

export const EventImageCard = ({
  image,
  onImageClick,
  className = "",
  aspectRatio = "aspect-square",
}: EventImageCardProps) => {
  const handleClick = () => {
    if (onImageClick) {
      onImageClick(image);
    }
  };

  return (
    <div
      className={`relative ${aspectRatio || ""} group cursor-pointer overflow-hidden rounded-xl ${className}`}
      onClick={handleClick}
      style={{ boxShadow: "0 6px 18px rgba(10,22,38,0.08)" }}
    >
      <div className="absolute inset-0 overflow-hidden border border-[#3B4451] bg-[#222D3B] transition-all duration-300 group-hover:border-[#2E8BFF]">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          {/* Text overlay always visible - bottom left */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#0A1626]/90 via-transparent to-transparent">
            <div className="p-4 text-left md:p-6">
              <p className="mb-1 text-base font-bold uppercase tracking-wider text-white md:text-lg">
                {image.alt}
              </p>
              {image.description && (
                <p className="text-xs font-normal leading-relaxed text-white/90 md:text-sm">
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
