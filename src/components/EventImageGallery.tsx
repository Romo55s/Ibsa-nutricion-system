import { useState } from "react";
import { EventImageCard, type EventImage } from "./EventImageCard";
import { EventImageModal } from "./EventModal";

interface EventImageGalleryProps {
  images: EventImage[];
  onImageClick?: (image: EventImage) => void;
}

export const EventImageGallery = ({
  images,
  onImageClick,
}: EventImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<EventImage | null>(null);

  return (
    <>
      <div className="grid items-start gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-12">
        {images.map((image, index) => {
          const isWide = index % 4 === 0 || index % 4 === 3;
          return (
            <EventImageCard
              key={image.src}
              image={image}
              onImageClick={onImageClick ?? setSelectedImage}
              className={isWide ? "lg:col-span-7" : "lg:col-span-5"}
              aspectRatio={
                isWide
                  ? "aspect-[4/3] lg:aspect-[7/4]"
                  : "aspect-[4/3] lg:aspect-[5/4]"
              }
            />
          );
        })}
      </div>
      {selectedImage && (
        <EventImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};
