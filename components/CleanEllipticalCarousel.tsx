import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function CleanEllipticalCarousel() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [images, setImages] = useState<{ id: number; title: string; image: string; }[]>([]);
    
  
  // Generate placeholder images on load
  useEffect(() => {
    // Create a large number of images to match the dense stacking in the reference
    const generatedImages = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      title: `Project ${i + 1}`,
      image: `1.webp`
    }));
    
    setImages(generatedImages);
  }, []);
  
  // Calculate positions for elliptical arrangement with proper angles
  const calculatePosition = (index: number, total: number): {
    x: number;
    y: number;
    zIndex: number;
    rotationAngle: number;
  } => {    // Full elliptical path
    const angle = (index / total) * 2 * Math.PI;
    
    // Ellipse parameters - slightly wider than taller
    const xRadius = 600;
    const yRadius = 400;
    
    // Calculate position on the ellipse
    const x = Math.sin(angle) * xRadius;
    const y = Math.cos(angle) * yRadius;
    
    // Calculate rotation angle for the image
    // Images should be perpendicular to the ellipse tangent at that point
    const rotationAngle = Math.atan2(-xRadius * Math.sin(angle), yRadius * Math.cos(angle)) * (180 / Math.PI);
    
    // Z-index based on y-position for proper overlap
    const zIndex = Math.floor(200 + y);
    
    return { x, y, zIndex, rotationAngle };
  };

  return (
    <div className="relative w-full h-screen bg-white text-white font-sans overflow-hidden">
      
      {/* Black dot marker as in original */}
      {/* <div className="absolute left-24 top-1/2 w-4 h-4 bg-black border-2 border-white rounded-full"></div>
       */}
      {/* Main content */}
      <div className="relative w-full h-3/4 flex justify-center items-center">
        {/* Center text (only visible when no image is hovered) */}

        
        {/* Center display for active image and title */}
        {activeIndex !== null && (
          <div className="absolute z-50 transition-all duration-500 transform flex flex-col items-center">
            <img 
              src={images[activeIndex]?.image}
              alt={images[activeIndex]?.title}
              className="w-96 h-64 object-cover mb-4"
            />
            <div className="text-xl font-medium mt-2 text-black">
              {images[activeIndex]?.title}
            </div>
          </div>
        )}

        {/* Elliptical carousel */}
        <div className="relative w-full h-full">
        { (
          <h2 className="absolute bottom-[-120px] left-1/2 transform -translate-x-1/2 z-50 text-9xl font-bold text-black text-center whitespace-nowrap">Shu.nyatam's Projects</h2>
        )}
          {images.map((image, index) => {
            const position = calculatePosition(index, images.length);
            const isActive = activeIndex === index;
            
            // Don't render the active image in the carousel
            if (isActive) return null;
            
            return (
              <div 
                key={image.id}
                className="absolute transition-all duration-300 transform cursor-pointer"
                style={{
                  left: `calc(50% + ${position.x}px)`,
                  top: `calc(50% + ${position.y}px)`,
                  zIndex: position.zIndex,
                  transform: `translate(-50%, -50%) rotate(${position.rotationAngle}deg) scale(0.6)`,
                  transformOrigin: 'center',
                  opacity: 0.8,
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
{/* <Image src={image.image} alt={image.title} width={96} height={64} className="object-cover" /> */}
<Image src={image.image} alt={image.title} width={160} height={100} className="object-cover" />

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}