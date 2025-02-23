'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function MenuPage() {
  const { addItem } = useCart();
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await fetch('https://mickybackend.vercel.app/api/menu');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMenuItems(data);
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map((item: MenuItem) => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    }

    fetchMenuItems();
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
    toast.success(`Added ${item.name} to cart`);
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
        <p className="text-muted-foreground">
          Discover our carefully curated selection of dishes
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex justify-center mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <MenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8 flex justify-center">
        <Button size="lg" onClick={handleGoToCart} className="px-8 py-6 text-lg">
          Go to Cart
        </Button>
      </div>
    </div>
  );
}

function MenuCard({ item, onAddToCart }: { item: MenuItem; onAddToCart: (item: MenuItem) => void }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img
          src={item.image}  // Use the full URL from backend
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <span className="text-lg font-bold text-primary">${item.price}</span>
        </div>
        <p className="text-muted-foreground mb-4">{item.description}</p>
        <Button className="w-full" onClick={() => onAddToCart(item)}>
          Add to Order
        </Button>
      </div>
    </Card>
  );
}