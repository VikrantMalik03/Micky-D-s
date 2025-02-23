'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Package, Truck, MinusCircle, PlusCircle } from 'lucide-react';

interface WholesaleItem {
  name: string;
  unit: string;
  minOrder: number;
  price: number;
  category: string;
}

const wholesaleItems: WholesaleItem[] = [
  {
    name: 'Premium Beef',
    unit: 'kg',
    minOrder: 50,
    price: 15.99,
    category: 'meat'
  },
  {
    name: 'Whole Chicken',
    unit: 'kg',
    minOrder: 30,
    price: 8.99,
    category: 'meat'
  },
  {
    name: 'Fresh Fish (Mixed)',
    unit: 'kg',
    minOrder: 25,
    price: 12.99,
    category: 'seafood'
  },
  {
    name: 'Fresh Shrimp',
    unit: 'kg',
    minOrder: 20,
    price: 19.99,
    category: 'seafood'
  },
  {
    name: 'Fresh Vegetables Mix',
    unit: 'kg',
    minOrder: 40,
    price: 4.99,
    category: 'produce'
  },
  {
    name: 'Premium Rice',
    unit: 'kg',
    minOrder: 100,
    price: 2.99,
    category: 'grains'
  },
  {
    name: 'Cooking Oil',
    unit: 'L',
    minOrder: 50,
    price: 3.99,
    category: 'essentials'
  },
  {
    name: 'Spice Mix Pack',
    unit: 'kg',
    minOrder: 10,
    price: 24.99,
    category: 'essentials'
  }
];

export default function TruckloadPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleQuantityChange = (itemName: string, value: number) => {
    const item = wholesaleItems.find(i => i.name === itemName);
    if (item && value >= 0) {
      setQuantities(prev => ({
        ...prev,
        [itemName]: value
      }));
    }
  };

  const calculateTotal = (item: WholesaleItem) => {
    const quantity = quantities[item.name] || 0;
    return quantity * item.price;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Prepare the data to send
    const inquiryData = {
      action: 'wholesale', // Add action parameter
      businessName: (e.target as HTMLFormElement).businessName.value,
      contactName: (e.target as HTMLFormElement).contactName.value,
      phone: (e.target as HTMLFormElement).phone.value,
      email: (e.target as HTMLFormElement).email.value,
      businessType: (e.target as HTMLFormElement).businessType.value,
      message: (e.target as HTMLFormElement).message.value,
      itemsOrdered: JSON.stringify(
        wholesaleItems
          .filter((item) => quantities[item.name] > 0)
          .map((item) => ({
            name: item.name,
            quantity: quantities[item.name],
            total: calculateTotal(item)
          }))
      ),
      callback: 'handleResponse' // JSONP callback function name
    };
  
    // Convert data to query parameters
    const queryParams = new URLSearchParams(inquiryData).toString();
  
    // Create a script element for JSONP
    const script = document.createElement('script');
    script.src = `https://script.google.com/macros/s/AKfycbxawihDVdy_QX_xZHONC474V9yNQ4OMm9SSZx4G5VAUYCXwUQBEvDiExMDYdmC9Bdg/exec?${queryParams}`;
    document.body.appendChild(script);
  
    // Define the callback function
    window.handleResponse = (response) => {
      if (response.success) {
        setFormSubmitted(true); // Show confirmation message
      } else {
        alert('Failed to submit inquiry. Please try again.');
      }
      document.body.removeChild(script); // Clean up the script element
    };
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Wholesale Food Supply</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Quality ingredients in bulk quantities for restaurants, hotels, and food service businesses.
          Minimum order quantities apply.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Wholesale Products */}
        <div>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Available Products</h2>
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="meat">Meat</TabsTrigger>
                <TabsTrigger value="seafood">Seafood</TabsTrigger>
                <TabsTrigger value="produce">Produce</TabsTrigger>
                <TabsTrigger value="essentials">Essentials</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-4">
                  {wholesaleItems.map((item, index) => (
                    <WholesaleItemCard 
                      key={index} 
                      item={item}
                      quantity={quantities[item.name] || 0}
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>
              </TabsContent>

              {['meat', 'seafood', 'produce', 'essentials'].map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="space-y-4">
                    {wholesaleItems
                      .filter((item) => item.category === category)
                      .map((item, index) => (
                        <WholesaleItemCard 
                          key={index} 
                          item={item}
                          quantity={quantities[item.name] || 0}
                          onQuantityChange={handleQuantityChange}
                        />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>

        {/* Inquiry Form */}
        <div>
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Wholesale Inquiry</h2>
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="mb-4">
                  <Truck className="h-12 w-12 mx-auto text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-muted-foreground">
                  We&apos;ve received your inquiry and will contact you within 24 hours to discuss your wholesale needs.
                </p>
                <Button
                  className="mt-6"
                  onClick={() => setFormSubmitted(false)}
                >
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <div className="flex items-center mt-1">
                      <Building2 className="h-5 w-5 text-muted-foreground mr-2" />
                      <Input id="businessName" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Name</Label>
                      <Input id="contactName" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Business Email</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <select
                      id="businessType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="">Select business type</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="hotel">Hotel</option>
                      <option value="catering">Catering Service</option>
                      <option value="retail">Retail Store</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Notes</Label>
                    <Textarea
                      id="message"
                      placeholder="Any special requirements or notes..."
                      className="h-32"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Inquiry
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to be contacted about wholesale opportunities.
                </p>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function WholesaleItemCard({ 
  item, 
  quantity,
  onQuantityChange 
}: { 
  item: WholesaleItem;
  quantity: number;
  onQuantityChange: (name: string, quantity: number) => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="font-bold text-primary">${item.price.toFixed(2)}/{item.unit}</p>
      </div>
      <div className="text-sm text-muted-foreground mb-3">
        <p>Minimum Order: {item.minOrder} {item.unit}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onQuantityChange(item.name, Math.max(0, quantity - 1))}
          >
            <MinusCircle className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(item.name, parseInt(e.target.value) || 0)}
            className="w-20 text-center"
            min="0"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onQuantityChange(item.name, quantity + 1)}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-right">
          <p className="font-semibold">Total: ${(quantity * item.price).toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
}