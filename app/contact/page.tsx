'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground">
            Get in touch with us for reservations, inquiries, or feedback
          </p>
        </div>

        {/* Main Contact Card */}
        <Card className="mb-8 mx-[150px]">
          <div className="grid md:grid-cols-2">
            {/* Animation Section */}
            <div className="p-6 flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/6c12efb8-dd9f-4524-9037-b72ef71b9bb0/DCz4kX0fjt.lottie"
                loop
                autoplay
              />
            </div>

            {/* Contact Form Section */}
            <div className="p-6">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for contacting us. We&apos;ll get back to you shortly.
                  </p>
                  <Button onClick={() => setFormSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <select
                      id="subject"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="private-event">Private Event</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      className="min-h-[120px]"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              )}
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-muted-foreground">123 Restaurant Street</p>
                    <p className="text-muted-foreground">City, State 12345</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">info@finedining.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Hours</h3>
                    <p className="text-muted-foreground">Mon-Thu: 11am-10pm</p>
                    <p className="text-muted-foreground">Fri-Sat: 11am-11pm</p>
                    <p className="text-muted-foreground">Sun: 11am-9pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <div className="aspect-video relative bg-muted rounded-lg">
                {/* Placeholder for map - in production, replace with actual map integration */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Map integration would be here
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}