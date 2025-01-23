import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GalleryImage {
  url: string;
  title: string;
  category: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    title: 'Main Dining Room',
    category: 'interior',
    description: 'Our elegant main dining space with crystal chandeliers'
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    title: 'Private Dining',
    category: 'interior',
    description: 'Intimate private dining room for special occasions'
  },
  {
    url: 'https://images.unsplash.com/photo-1592861956120-e524fc739696',
    title: 'Signature Dish',
    category: 'food',
    description: 'Pan-seared scallops with citrus butter sauce'
  },
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    title: 'Chef\'s Special',
    category: 'food',
    description: 'Seasonal tasting menu highlights'
  },
  {
    url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20',
    title: 'Wine Cellar',
    category: 'interior',
    description: 'Our extensive collection of fine wines'
  },
  {
    url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
    title: 'Private Events',
    category: 'events',
    description: 'Celebrating special moments'
  },
  {
    url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    title: 'Dessert Selection',
    category: 'food',
    description: 'Handcrafted desserts by our pastry chef'
  },
  {
    url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf',
    title: 'Bar Area',
    category: 'interior',
    description: 'Craft cocktails and fine spirits'
  },
  {
    url: 'https://images.unsplash.com/photo-1555244162-803834f70033',
    title: 'Special Event',
    category: 'events',
    description: 'Wine tasting and pairing events'
  }
];

export default function GalleryPage() {
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