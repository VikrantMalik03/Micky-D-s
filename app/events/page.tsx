'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Music2, Wine, Utensils, PartyPopper, CalendarDays } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  description: string;
  icon: 'music' | 'wine' | 'food' | 'party';
  price: string;
}

interface Reservation {
  eventId: number;
  name: string;
  email: string;
  phone: string;
  guests: number;
  specialRequests?: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Jazz Night',
    date: new Date(2024, 3, 15),
    time: '7:00 PM - 10:00 PM',
    description: 'Enjoy an evening of live jazz music with our house band while savoring our special dinner menu.',
    icon: 'music',
    price: '$75 per person'
  },
  {
    id: 2,
    title: 'Wine Tasting',
    date: new Date(2024, 3, 20),
    time: '6:00 PM - 8:00 PM',
    description: 'Sample our finest wines paired with artisanal cheeses and charcuterie.',
    icon: 'wine',
    price: '$90 per person'
  },
  {
    id: 3,
    title: 'Chef\'s Table Experience',
    date: new Date(2024, 3, 25),
    time: '7:30 PM - 10:30 PM',
    description: 'An intimate dining experience featuring a special 7-course tasting menu with our executive chef.',
    icon: 'food',
    price: '$150 per person'
  },
  {
    id: 4,
    title: 'Spring Celebration',
    date: new Date(2024, 4, 1),
    time: '6:30 PM - 11:00 PM',
    description: 'Welcome spring with a special seasonal menu and cocktail pairings.',
    icon: 'party',
    price: '$95 per person'
  }
];

export default function EventsPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [formData, setFormData] = useState<Reservation>({
    eventId: 0,
    name: '',
    email: '',
    phone: '',
    guests: 1,
    specialRequests: ''
  });

  const getEventIcon = (icon: Event['icon']) => {
    switch (icon) {
      case 'music':
        return <Music2 className="h-6 w-6" />;
      case 'wine':
        return <Wine className="h-6 w-6" />;
      case 'food':
        return <Utensils className="h-6 w-6" />;
      case 'party':
        return <PartyPopper className="h-6 w-6" />;
    }
  };

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handleShowAllEvents = () => {
    setShowAllEvents(true);
    setSelectedDate(undefined);
  };

  const handleReservationClick = (event: Event) => {
    setSelectedEvent(event);
    setFormData(prev => ({ ...prev, eventId: event.id }));
    setShowReservationForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setReservations(prev => [...prev, formData]);
    setShowReservationForm(false);
    setReservationSuccess(true);
    setFormData({
      eventId: 0,
      name: '',
      email: '',
      phone: '',
      guests: 1,
      specialRequests: ''
    });
    setTimeout(() => setReservationSuccess(false), 3000);
  };

  const userHasReservation = (eventId: number) => {
    return reservations.some(reservation => reservation.eventId === eventId);
  };

  const filteredEvents = showAllEvents ? events : events.filter(event =>
    selectedDate ?
      event.date.toDateString() === selectedDate.toDateString() :
      true
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Upcoming Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for extraordinary evenings of culinary delights, music, and celebration at Mickey D's Subs & Stuff
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={handleShowAllEvents}
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              Browse All Events
            </Button>
            <Button 
              variant="outline"
              onClick={handleContactClick}
            >
              Contact Us
            </Button>
          </div>
        </div>

        {reservationSuccess && (
          <Alert className="mb-8 max-w-2xl mx-auto transform -translate-y-4 animate-slide-down bg-green-50 border border-green-200">
            <AlertDescription className="text-green-600 font-medium">
              Your reservation has been confirmed! We'll send you a confirmation email shortly.
            </AlertDescription>
          </Alert>
        )}

        {/* Calendar and Animation Card */}
        <Card className="max-w-4xl mx-auto mb-16 p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/19981301-e136-423b-beb4-066d42d1af34/08oJ216qdj.lottie"
                loop
                autoplay
                className="w-full max-w-md"
              />
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                Select Date
              </h2>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>
          </div>
        </Card>

        {/* Reservations Section */}
        {reservations.length > 0 && (
          <Card className="max-w-4xl mx-auto mb-16 p-6 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-primary/5 to-primary/10">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <PartyPopper className="mr-2 h-5 w-5 text-primary" />
              Your Reservations
            </h2>
            <div className="space-y-6">
              {reservations.map((reservation, index) => {
                const event = events.find(e => e.id === reservation.eventId);
                return event ? (
                  <div key={index} className="border-b border-primary/20 pb-4 hover:bg-primary/5 p-3 rounded-lg transition-colors">
                    <div className="flex items-start gap-3">
                      {getEventIcon(event.icon)}
                      <div>
                        <h3 className="font-medium text-lg">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {event.date.toLocaleDateString()} • {event.time}
                        </p>
                        <p className="text-sm font-medium text-primary mt-1">
                          Guests: {reservation.guests}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </Card>
        )}

        {/* Events Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="grid gap-6">
              {filteredEvents.map(event => (
                <Card key={event.id} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl">
                        {getEventIcon(event.icon)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold mb-2 text-primary">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <CalendarDays className="h-4 w-4" />
                          <p>
                            {event.date.toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <p className="text-muted-foreground mb-4">{event.time}</p>
                        <p className="mb-4 text-gray-700 leading-relaxed">{event.description}</p>
                        <p className="font-semibold text-primary text-lg">{event.price}</p>
                      </div>
                    </div>
                    <div className="md:min-w-[120px] flex md:justify-end">
                      {userHasReservation(event.id) ? (
                        <Button variant="outline" disabled className="w-full md:w-auto">
                          Reserved
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => handleReservationClick(event)}
                          className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                        >
                          Reserve Spot
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-xl font-semibold text-gray-800 mb-4">
                No events scheduled for this date
              </p>
              <Button
                onClick={handleShowAllEvents}
                className="bg-primary hover:bg-primary/90"
              >
                View all events
              </Button>
            </Card>
          )}
        </div>

        {/* Reservation Dialog */}
        <Dialog open={showReservationForm} onOpenChange={setShowReservationForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-primary">
                Reserve Your Spot
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitReservation} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="guests" className="text-sm font-medium">
                    Number of Guests
                  </Label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    required
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="specialRequests" className="text-sm font-medium">
                    Special Requests
                  </Label>
                  <Input
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  Confirm Reservation
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}