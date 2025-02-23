'use client';

import { useState } from 'react';

declare global {
  interface Window {
    handleResponse: (response: { success: any }) => void;
  }
}
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function OrderPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [orderType, setOrderType] = useState('delivery');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    apt: '',
    city: '',
    state: '',
    zip: '',
    time: '',
    instructions: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!date) {
      setError('Please select a date');
      return false;
    }

    if (formData.time === '' || formData.time === 'Select a time') {
      setError('Please select a time');
      return false;
    }

    if (orderType === 'delivery') {
      if (!formData.street || !formData.city || !formData.state || !formData.zip) {
        setError('Please fill in all required delivery address fields');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Prepare the data to send
    const orderData = {
      action: 'order', // Add action parameter
      orderType,
      street: formData.street,
      apt: formData.apt,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      date: date ? format(date, 'PPP') : '',
      time: formData.time,
      instructions: formData.instructions,
      callback: 'handleResponse' // JSONP callback function name
    };

    // Convert data to query parameters
    const queryParams = new URLSearchParams(orderData).toString();

    // Create a script element for JSONP
    const script = document.createElement('script');
    script.src = `https://script.google.com/macros/s/AKfycbxawihDVdy_QX_xZHONC474V9yNQ4OMm9SSZx4G5VAUYCXwUQBEvDiExMDYdmC9Bdg/exec?${queryParams}`;
    document.body.appendChild(script);

    // Define the callback function
    window.handleResponse = (response: { success: any; }) => {
      if (response.success) {
        setIsLoading(false);
        router.push('/order'); // Redirect to payment page after successful submission
      } else {
        setError('Failed to submit order. Please try again.');
        setIsLoading(false);
      }
      document.body.removeChild(script); // Clean up the script element
    };
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="w-64 h-64">
          <DotLottieReact
            src="https://lottie.host/d4672b65-3921-444f-b9ce-1c1f7938eb9e/XCTaaz4yOt.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white from-blue-50 to-purple-50">
      {/* Main Heading - Centered */}
      <div className="text-center pt-8 pb-6">
        <h1 className="text-4xl font-bold text-gray-800">Place Your Order</h1>
        <p className="text-gray-600 text-lg mt-2">
          Choose your favorite dishes for delivery or pickup
        </p>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 pb-16 flex justify-center items-start gap-8">
        {/* Form Section - Reduced width */}
        <div className="w-5/12">
          <Card className="bg-white/40 backdrop-blur-sm border-0 shadow-xl">
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {error && (
                  <Alert variant="destructive" className="mb-6 bg-red-500/80">
                    <AlertDescription className="text-white">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Order Type Selection */}
                <div className="mb-8">
                  <Label className="text-lg font-semibold mb-4 block">Order Type</Label>
                  <RadioGroup
                    defaultValue="delivery"
                    onValueChange={setOrderType}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery">Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup">Pickup</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Delivery Address */}
                {orderType === 'delivery' && (
                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-semibold flex items-center">
                      <MapPin className="mr-2 h-5 w-5" />
                      Delivery Address
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="street">Street Address *</Label>
                        <Input
                          id="street"
                          placeholder="123 Main St"
                          required
                          value={formData.street}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="apt">Apt/Suite</Label>
                        <Input
                          id="apt"
                          placeholder="Apt #"
                          value={formData.apt}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="City"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          placeholder="State"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code *</Label>
                        <Input
                          id="zip"
                          placeholder="ZIP"
                          required
                          value={formData.zip}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Pickup Location */}
                {orderType === 'pickup' && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold flex items-center mb-4">
                      <MapPin className="mr-2 h-5 w-5" />
                      Pickup Location
                    </h3>
                    <Card className="p-4 bg-white/50 backdrop-blur-sm">
                      <p className="font-medium">Mickey D's Subs & Stuff Restaurant</p>
                      <p className="text-muted-foreground">123 Restaurant Street</p>
                      <p className="text-muted-foreground">City, State 12345</p>
                    </Card>
                  </div>
                )}

                {/* Date and Time Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold flex items-center mb-4">
                    <Clock className="mr-2 h-5 w-5" />
                    Preferred Time
                  </h3>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Label>Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="time">Time *</Label>
                      <select
                        id="time"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                        value={formData.time}
                        onChange={handleInputChange}
                      >
                        <option>Select a time</option>
                        <option>11:00 AM</option>
                        <option>11:30 AM</option>
                        <option>12:00 PM</option>
                        <option>12:30 PM</option>
                        <option>1:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="mb-8">
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Any special requests or dietary requirements?"
                    className="h-24"
                    value={formData.instructions}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  size="lg"
                  type="submit"
                >
                  Proceed to Payment
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Animation Section */}
        <div className="w-6/8 pt-4">
          <DotLottieReact
            src="https://lottie.host/52a48ec8-24ee-4dcb-8146-d5a41568c3a6/JAdgwR4mB2.lottie"
            loop
            autoplay
            style={{ width: '650px', height: '650px' }}
          />
        </div>
      </div>
    </div>
  );
}