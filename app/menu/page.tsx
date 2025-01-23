'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
  
  const menuItems: MenuItem[] = [
    // Starters
    {
      id: 1,
      name: 'Deep Fried Veggies Platter',
      description: 'Battered mushrooms, zucchini, mozza sticks & onion rings',
      price: 10.88,
      image: '/appetizer.webp',
      category: 'starters'
    },
    {
      id: 2,
      name: 'Mozzarella Sticks',
      description: 'Golden-fried mozzarella sticks with marinara sauce',
      price: 6.99,
      image: '/mozza-sticks.webp',
      category: 'starters'
    },
    {
      id: 3,
      name: 'Chicken Strips',
      description: 'Hand-breaded chicken strips served with dipping sauce',
      price: 11.49,
      image: '/chicken-strips.webp',
      category: 'starters'
    },
    {
      id: 4,
      name: 'Wings',
      description: 'Crispy chicken wings with your choice of sauce',
      price: 12.88,
      image: '/wings.webp',
      category: 'starters'
    },
    {
      id: 5,
      name: 'Munchie Platter',
      description: 'Chicken strips, wings, mozza sticks, pepperoni, onion rings & fries',
      price: 19.49,
      image: '/platter.webp',
      category: 'starters'
    },
    // Mains
    {
      id: 6,
      name: 'Mickey Special Sub',
      description: 'Ham, roast beef, turkey, salami & pepp',
      price: 15.49,
      image: '/sub.webp',
      category: 'mains'
    },
    {
      id: 7,
      name: 'Fisherman\'s Platter',
      description: '1pc fish, 5 scallops, 5 shrimp, bag clams',
      price: 29.99,
      image: '/seafood-platter.webp',
      category: 'mains'
    },
    {
      id: 8,
      name: 'Roast Beef Dinner',
      description: 'Traditional roast beef served with sides',
      price: 18.99,
      image: '/roast-beef.webp',
      category: 'mains'
    },
    {
      id: 9,
      name: 'Special Poutine',
      description: 'Choice of hamburger, donair, bacon, chicken strip, or veggie toppings',
      price: 10.99,
      image: '/poutine.webp',
      category: 'mains'
    },
    {
      id: 10,
      name: 'Fish & Chips',
      description: 'Hand-battered fish served with homemade fries',
      price: 16.99,
      image: '/fish-chips.webp',
      category: 'mains'
    },
    // Desserts
    {
      id: 11,
      name: 'Coconut Cream Pie',
      description: 'Classic coconut cream pie with whipped topping',
      price: 6.88,
      image: '/coconut-pie.webp',
      category: 'desserts'
    },
    {
      id: 12,
      name: 'Butterscotch Pie',
      description: 'Rich butterscotch filling in a flaky crust',
      price: 6.88,
      image: '/butterscotch-pie.webp',
      category: 'desserts'
    },
    {
      id: 13,
      name: 'Lemon Pie',
      description: 'Tangy lemon pie with meringue topping',
      price: 6.88,
      image: '/lemon-pie.webp',
      category: 'desserts'
    },
    {
      id: 14,
      name: 'Ice Cream',
      description: 'Creamy vanilla ice cream',
      price: 3.99,
      image: '/ice-cream.webp',
      category: 'desserts'
    },
    {
      id: 15,
      name: 'Milkshake',
      description: 'Choice of chocolate, vanilla, or strawberry',
      price: 7.49,
      image: '/milkshake.webp',
      category: 'desserts'
    }
  ];

export default function MenuPage() {
  const { addItem } = useCart();
  const router = useRouter();

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
    router.push('/cart'); // Make sure you have this route set up in your Next.js app
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
          <TabsTrigger value="all">Kids Special</TabsTrigger>
          <TabsTrigger value="starters">Adult Lunch Specials</TabsTrigger>
          <TabsTrigger value="mains">Appetizers</TabsTrigger>
          <TabsTrigger value="desserts">Sandwitch & Wraps</TabsTrigger>
          {/* <TabsTrigger value="desserts">Sandwitch & Wraps</TabsTrigger>
          <TabsTrigger value="desserts">Sandwitch & Wraps</TabsTrigger>
          <TabsTrigger value="desserts">Sandwitch & Wraps</TabsTrigger>
          <TabsTrigger value="desserts">Sandwitch & Wraps</TabsTrigger>
          <TabsTrigger value="desserts">Sandwitch & Wraps</TabsTrigger>
          <TabsTrigger value="desserts">Sandwitch & Wraps</TabsTrigger>
          <TabsTrigger value="desserts">Sandwitch & Wraps</TabsTrigger> */}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <MenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </TabsContent>

        {['starters', 'mains', 'desserts'].map((category) => (
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

      {/* Go to Cart Button */}
      <div className="mt-8 flex justify-center">
        <Button 
          size="lg"
          onClick={handleGoToCart}
          className="px-8 py-6 text-lg"
        >
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
          src={item.image}
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