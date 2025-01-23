'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, ShoppingBag, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';

export default function Navbar() {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (isAuthPage) return null;

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-6 w-6" />
            <span className="text-xl font-bold">Mickey D's Subs & Stuff</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/menu" className="hover:text-primary">Menu</Link>
            <Link href="/order" className="hover:text-primary">Order Online</Link>
            <Link href="/truckload" className="hover:text-primary">Wholesale</Link>
            <Link href="/reservations" className="hover:text-primary">Reservations</Link>
            <Link href="/events" className="hover:text-primary">Events</Link>
            <Link href="/gallery" className="hover:text-primary">Gallery</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild className="relative">
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/auth/sign-in">
                <User className="h-5 w-5 mr-2" />
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}