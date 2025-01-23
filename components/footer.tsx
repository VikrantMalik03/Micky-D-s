import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Mickey D's Subs & Stuff</h3>
            <p className="text-muted-foreground">
              Experience exceptional cuisine in an elegant atmosphere.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Hours</h3>
            <p className="text-muted-foreground">Mon-Thu: 11am-10pm</p>
            <p className="text-muted-foreground">Fri-Sat: 11am-11pm</p>
            <p className="text-muted-foreground">Sun: 11am-9pm</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-muted-foreground">Mickey D's</p>
            <p className="text-muted-foreground">(902) 862-7800</p>
            <p className="text-muted-foreground">
              <a href="mailto:mickeydscb@gmail.com" className="hover:text-primary">
                mickeydscb@gmail.com
              </a>
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/12CTscJx3oq/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/mickeyds_cb?igsh=MWRtYTJtd3NhcXFoMQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mickey D's Subs & Stuff Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
