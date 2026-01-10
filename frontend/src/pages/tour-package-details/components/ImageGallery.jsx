import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ImageGallery = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      <div className="w-full">
        <div className="relative aspect-[16/9] bg-muted rounded-xl overflow-hidden shadow-warm-md">
          <Image
            src={images?.[selectedImageIndex]?.url}
            alt={images?.[selectedImageIndex]?.alt}
            className="w-full h-full object-cover"
          />
          
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-smooth shadow-warm focus-ring"
            aria-label="Previous image"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-smooth shadow-warm focus-ring"
            aria-label="Next image"
          >
            <Icon name="ChevronRight" size={24} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-md flex items-center justify-center hover:bg-card transition-smooth shadow-warm focus-ring"
            aria-label="View fullscreen"
          >
            <Icon name="Maximize2" size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-card/90 backdrop-blur-sm rounded-full">
            <span className="text-sm font-medium data-text">
              {selectedImageIndex + 1} / {images?.length}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`aspect-square rounded-md overflow-hidden transition-smooth hover-lift ${
                selectedImageIndex === index
                  ? 'ring-3 ring-primary ring-offset-2' :'opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image?.url}
                alt={image?.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      {isFullscreen && (
        <div className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 w-12 h-12 bg-card rounded-full flex items-center justify-center hover:bg-muted transition-smooth shadow-warm-lg focus-ring"
            aria-label="Close fullscreen"
          >
            <Icon name="X" size={24} />
          </button>

          <div className="relative w-full max-w-6xl aspect-[16/9]">
            <Image
              src={images?.[selectedImageIndex]?.url}
              alt={images?.[selectedImageIndex]?.alt}
              className="w-full h-full object-contain rounded-xl"
            />

            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-card rounded-full flex items-center justify-center hover:bg-muted transition-smooth shadow-warm-lg focus-ring"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeft" size={28} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-card rounded-full flex items-center justify-center hover:bg-muted transition-smooth shadow-warm-lg focus-ring"
              aria-label="Next image"
            >
              <Icon name="ChevronRight" size={28} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;