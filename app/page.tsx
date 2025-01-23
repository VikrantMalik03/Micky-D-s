'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          alt="Restaurant interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">Experience Mickey D's Subs & Stuff</h1>
            <p className="text-xl mb-8">
              Indulge in exceptional cuisine crafted with passion and served in an elegant atmosphere.
            </p>
            <div className="flex space-x-4">
              <Button
                size="lg"
                onClick={() => window.location.href = '/reservations'}
              >
                Make a Reservation
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="bg-black text-white hover:bg-black/90"
                onClick={() => window.location.href = '/menu'}
              >
                View Menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Mickey D's Subs & Stuff</h3>
              <p className="text-muted-foreground">
                Experience our carefully curated menu featuring the finest ingredients.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Private Events</h3>
              <p className="text-muted-foreground">
                Host your special occasions in our elegant private dining rooms.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Wine Selection</h3>
              <p className="text-muted-foreground">
                Explore our extensive wine list curated by expert sommeliers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Grilled Salmon',
                image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927',
                description: 'Fresh Atlantic salmon with seasonal vegetables',
              },
              {
                name: 'Beef Tenderloin',
                image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d',
                description: 'Prime cut beef with truffle mashed potatoes',
              },
              {
                name: 'Chocolate Soufflé',
                image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc',
                description: 'Warm chocolate soufflé with vanilla ice cream',
              },
            ].map((dish, index) => (
              <div key={index} className="group relative">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold mt-4">{dish.name}</h3>
                <p className="text-muted-foreground">{dish.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => window.location.href = '/menu'}
            >
              View Full Menu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}