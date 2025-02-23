'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';

interface GalleryImage {
  url: string;
  title: string;
  category: string;
  description: string;
}

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    // Fetch gallery images from the backend
    async function fetchGalleryImages() {
      try {
        const response = await fetch('https://mickybackend.vercel.app/api/gallery');
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images');
        }
        const data = await response.json();
        setGalleryImages(data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    }

    fetchGalleryImages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Gallery</h1>
        <p className="text-muted-foreground">
          Experience the ambiance and culinary artistry of our restaurant
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex justify-center mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="interior">Interior</TabsTrigger>
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <GalleryCard key={index} image={image} />
            ))}
          </div>
        </TabsContent>

        {['interior', 'food', 'events'].map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages
                .filter((image) => image.category === category)
                .map((image, index) => (
                  <GalleryCard key={index} image={image} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function GalleryCard({ image }: { image: GalleryImage }) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative aspect-square">
        <Image
          src={image.url}
          alt={image.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
        <p className="text-muted-foreground">{image.description}</p>
      </div>
    </Card>
  );
}