'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Users, Clock } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ReservationsPage() {
  const [date, setDate] = useState<Date>();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Make a Reservation</h1>
            <p className="text-muted-foreground">
              Reserve your table for a memorable dining experience
            </p>
          </div>

          <Card className="p-6 shadow-lg w-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <DotLottieReact
                  src="https://lottie.host/cbf2540c-bcef-46a6-84a5-9bf4d57b802e/oKvcNB5lPQ.lottie"
                  loop
                  autoplay
                />
              </div>

              <div>
                {formSubmitted ? (
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <Clock className="h-12 w-12 mx-auto text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Reservation Confirmed!</h3>
                    <p className="text-muted-foreground mb-4">
                      Thank you for choosing to dine with us. We&apos;ve sent a confirmation email with your reservation details.
                    </p>
                    <Button onClick={() => setFormSubmitted(false)}>
                      Make Another Reservation
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" required />
                      </div>
                      <div>
                        <Label htmlFor="guests">Number of Guests</Label>
                        <div className="flex items-center mt-1">
                          <Users className="h-5 w-5 text-muted-foreground mr-2" />
                          <select
                            id="guests"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            required
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? 'Guest' : 'Guests'}
                              </option>
                            ))}
                            <option value="9+">9+ Guests</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Date</Label>
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
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="time">Time</Label>
                        <select
                          id="time"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          required
                        >
                          <option value="">Select time</option>
                          <option>5:00 PM</option>
                          <option>5:30 PM</option>
                          <option>6:00 PM</option>
                          <option>6:30 PM</option>
                          <option>7:00 PM</option>
                          <option>7:30 PM</option>
                          <option>8:00 PM</option>
                          <option>8:30 PM</option>
                          <option>9:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="special-requests">Special Requests</Label>
                      <textarea
                        id="special-requests"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Any dietary restrictions, allergies, or special occasions?"
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Confirm Reservation
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      By making a reservation, you agree to our reservation policy and cancellation terms.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}