import { useState } from 'react';
import { cn } from '@/core/utils';
import type { VehicleGalleryProps } from './types';

/**
 * @component VehicleGallery
 * @summary Displays the vehicle's photo gallery with a main image and thumbnails.
 * @internal Used by CarDetailPage
 */
export function VehicleGallery({ photos, carTitle }: VehicleGalleryProps) {
  const [mainPhoto, setMainPhoto] = useState(photos[0]);

  if (!photos || photos.length === 0) {
    return (
      <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Sem fotos disponíveis</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video w-full overflow-hidden rounded-lg border">
        <img
          src={mainPhoto.url}
          alt={mainPhoto.caption || carTitle}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      {photos.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setMainPhoto(photo)}
              className={cn(
                'aspect-video w-full overflow-hidden rounded border-2 transition-all',
                mainPhoto.url === photo.url
                  ? 'border-primary'
                  : 'border-transparent hover:border-primary/50'
              )}
            >
              <img
                src={photo.url}
                alt={photo.caption || `Foto ${index + 1} de ${carTitle}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
