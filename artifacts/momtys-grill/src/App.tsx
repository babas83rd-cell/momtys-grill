import { useState } from 'react';
import { ArrowDownRight, ArrowRight, Clock3, MapPin, Menu as MenuIcon, Phone, X } from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import businessLogo from '@assets/image0_1789339566384.png';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const locations = [
  {
    id: "king-drive",
    status: "open",
    name: "King Drive",
    neighborhood: "South Side Chicago",
    address: "8307 S King Dr",
    city: "Chicago, Illinois 60619",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=8307+S+King+Dr+Chicago+IL+60619",
    phone: "(773) 231-9191",
    phoneHref: "tel:+17732319191",
    hours: ["MON–THU 10A–12A", "FRI–SAT 10A–1A", "SUN 11A–10P"],
    menuImages: [
      { src: "/menus/king-drive/sandwiches-burgers.webp", title: "Sandwiches & Burgers", alt: "King Drive menu featuring fish, crispy chicken, grilled chicken sandwiches, cheeseburgers and specialty burgers" },
      { src: "/menus/king-drive/chicken-seafood.webp", title: "Chicken & Seafood", alt: "King Drive menu featuring chicken wings, party wings, tenders, nuggets, catfish and shrimp" },
      { src: "/menus/king-drive/philly-sandwiches.webp", title: "Philly Sandwiches", alt: "King Drive menu featuring Super Philly, steak, chicken, turkey and crispy Philly sandwiches" },
      { src: "/menus/king-drive/chicago-style.webp", title: "Chicago Style", alt: "King Drive menu featuring Italian beef, Polish sausage, corned beef, gyro, Jim Shoe and gyro plate" },
      { src: "/menus/king-drive/rice-bowls-salads-sides.webp", title: "Bowls, Salads & Sides", alt: "King Drive menu featuring rice bowls, sauces, salads, pizza puffs, cheese sticks, onion rings and fries" },
      { src: "/menus/king-drive/loaded-fries-drinks-desserts.webp", title: "Loaded Favorites, Drinks & Desserts", alt: "King Drive menu featuring loaded fries, nachos, lemonade slushies, beverages and desserts" },
    ],
  },
  {
    id: "halsted-street",
    status: "open",
    name: "Halsted Street",
    neighborhood: "Chicago, Illinois",
    address: "11449 S Halsted St",
    city: "Chicago, Illinois 60628",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=11449+S+Halsted+St+Chicago+IL+60628",
    phone: "(773) 733-0680",
    phoneHref: "tel:+17737330680",
    hours: ["MON–THU 10A–12A", "FRI–SAT 10A–1A", "SUN 11A–10P"],
    menuImages: [
      { src: "/menus/halsted-street/burgers-sandwiches.webp", title: "Burgers & Sandwiches", alt: "Halsted Street menu featuring cheeseburgers, gyro cheeseburgers, Italian beef burgers, turkey burgers, bacon cheeseburgers, grilled chicken sandwiches and crispy chicken sandwiches" },
      { src: "/menus/halsted-street/chicken-wings.webp", title: "Chicken Wings & Tenders", alt: "Halsted Street menu featuring whole wings, party wings, chicken tenders and chicken nuggets" },
      { src: "/menus/halsted-street/rice-bowls-sides.webp", title: "Rice Bowls & Sides", alt: "Halsted Street menu featuring rice bowls, sauces, loaded nachos, loaded fries, fries, onion rings, cheese sticks and pizza puffs" },
      { src: "/menus/halsted-street/philly-sandwiches.webp", title: "Philly Sandwiches", alt: "Halsted Street menu featuring Super Philly, Philly steak, Philly chicken, Philly mix and crispy Philly sandwiches" },
      { src: "/menus/halsted-street/chicago-style.webp", title: "Chicago Style", alt: "Halsted Street menu featuring Italian beef, Polish sausage, corned beef, gyro sandwich, Jim Shoe and gyro plate" },
    ],
  },
  {
    id: "111th-street",
    status: "coming-soon",
    name: "111th Street",
    neighborhood: "Chicago, Illinois",
    address: "9 E 111th St",
    city: "Chicago, Illinois",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=9+E+111th+St+Chicago+IL",
    phone: "",
    phoneHref: "",
    hours: [],
    menuImages: [],
  },
] as const;

function BrandMark() {
  return (
    <a href="/" className="flex items-center" data-testid="link-brand-home" aria-label="Momty's Grill home">
      <img src={businessLogo} alt="Momty's Grill" className="h-12 w-auto max-w-[11rem] object-contain sm:h-14 sm:max-w-[13rem]" data-testid="img-business-logo" />
    </a>
  );
}

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const jumpAndClose = () => setMobileOpen(false);

  return (
    <main id="top" className="site-shell min-h-[100dvh] bg-[hsl(var(--background))]">
      <div className="bg-[hsl(var(--accent))] px-5 py-2 text-center font-mono-brand text-[10px] uppercase tracking-[.18em] text-[hsl(var(--accent-foreground))]" data-testid="text-announcement">
        Open daily · Mon–Thu 10am–12am · Fri–Sat 10am–1am · Sun 11am–10pm
      </div>

      <header className="sticky top-0 z-40 border-b border-[hsl(var(--border)/.72)] bg-[hsl(var(--background)/.94)] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
          <BrandMark />
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <a href="#story" className="nav-link font-mono-brand text-[11px] uppercase tracking-[.16em]" data-testid="link-nav-story">Our story</a>
            <a href="#visit" className="nav-link font-mono-brand text-[11px] uppercase tracking-[.16em]" data-testid="link-nav-visit">Visit</a>
          </nav>
          <div className="hidden items-center gap-5 md:flex">
            <a href="#visit" className="rounded-full bg-[hsl(var(--primary))] px-5 py-3 font-mono-brand text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]" data-testid="link-plan-visit">
              Plan a visit
            </a>
          </div>
          <button type="button" className="rounded-full p-2 md:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} data-testid="button-mobile-menu">
            {mobileOpen ? <X size={23} /> : <MenuIcon size={23} />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="border-t border-[hsl(var(--border)/.65)] px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-4">
              <a href="#story" onClick={jumpAndClose} className="font-mono-brand text-[11px] uppercase tracking-[.16em]" data-testid="link-mobile-story">Our story</a>
              <a href="#visit" onClick={jumpAndClose} className="font-mono-brand text-[11px] uppercase tracking-[.16em]" data-testid="link-mobile-visit">Visit</a>
              <a href="tel:+17732319191" className="font-mono-brand text-[11px] uppercase tracking-[.16em]" data-testid="link-mobile-call">Call the grill</a>
            </div>
          </nav>
        )}
      </header>

      <section className="relative isolate min-h-[calc(100svh-7.5rem)] overflow-hidden bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]" aria-labelledby="hero-title">
        <video className="absolute inset-0 h-full w-full object-cover object-center" autoPlay muted loop playsInline preload="metadata" poster="/momtys-grill-hero.png" aria-hidden="true" data-testid="video-hero-food">
          <source src="/momtys-grill-front.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[hsl(var(--accent)/.68)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--accent)/.34)] via-transparent to-[hsl(var(--accent)/.88)]" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-7.5rem)] max-w-5xl items-center justify-center px-5 py-10 text-center sm:px-8 sm:py-12">
          <div className="flex max-w-3xl flex-col items-center">
            <img src={businessLogo} alt="Momty's Grill" className="reveal h-auto w-[15rem] object-contain drop-shadow-[0_3px_0_rgba(255,203,5,.35)] sm:w-[20rem] md:w-[25rem]" data-testid="img-hero-business-logo" />
            <p className="reveal reveal-1 mt-4 font-mono-brand text-[10px] uppercase tracking-[.24em] text-[hsl(var(--primary))]">South Side Chicago · Made to order</p>
            <h1 id="hero-title" className="reveal reveal-2 mt-3 font-display text-[clamp(3.4rem,9vw,7.5rem)] font-semibold leading-[.84] tracking-[-.065em]" data-testid="text-hero-heading">
              Come hungry.<br /><em className="text-[hsl(var(--primary))]">Leave happy.</em>
            </h1>
            <p className="reveal reveal-3 mt-5 max-w-xl text-[1.05rem] leading-7 text-[hsl(var(--foreground)/.78)] sm:text-[1.15rem]">
              Cheesy Phillies, big burgers, golden crispy chicken, and loaded plates for the neighborhood. Pull up a chair — Momty's is serving Chicago tonight.
            </p>
            <div className="reveal reveal-4 mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a href="#visit" className="arrow-button inline-flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-7 py-4 font-mono-brand text-[11px] uppercase tracking-[.16em] text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]" data-testid="link-hero-visit">
                Find a location <ArrowDownRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="scroll-mt-24 bg-[hsl(var(--primary))] px-5 py-20 text-[hsl(var(--primary-foreground))] lg:px-10 lg:py-28" aria-labelledby="story-title">
        <div className="mx-auto max-w-4xl">
          <h2 id="story-title" className="max-w-3xl font-display text-[clamp(3rem,6vw,5.7rem)] font-semibold leading-[.92] tracking-[-.055em]">Made with heart.<br /><em>Served like family.</em></h2>
          <div className="mt-8 max-w-3xl space-y-5 text-[1.03rem] leading-8 text-[hsl(var(--primary-foreground)/.76)]">
            <p>Momty’s Grill started with a simple idea: serve the kind of food we’d be proud to put on our own family’s table.</p>
            <p>No fancy rules. No tiny portions. Just fresh food, bold flavor, and plenty of choices—hot off the grill and made to satisfy.</p>
            <p>From our Philly steaks and juicy burgers to crispy chicken, wings, gyros, fish, and loaded favorites, we built our menu around the food our neighborhood actually loves to eat. Every order matters to us, whether it’s your first visit or we already know what you’re getting when you walk through the door.</p>
            <p>Momty’s isn’t just about feeding people. It’s about becoming part of the neighborhood.</p>
            <p>Come hungry. Leave happy. And when you come back, we’ll have the grill ready.</p>
          </div>
          <div className="mt-10 border-t border-[hsl(var(--primary-foreground)/.3)] pt-5">
            <p className="font-mono-brand text-[11px] uppercase tracking-[.2em]">Momty’s Grill</p>
            <p className="mt-2 font-display text-2xl italic">Always Fresh. Always Made for You.</p>
          </div>
          <a href="#visit" className="arrow-button mt-8 inline-flex items-center gap-3 border-b-2 border-[hsl(var(--primary-foreground))] pb-2 font-mono-brand text-[10px] uppercase tracking-[.15em] text-[hsl(var(--primary-foreground))]" data-testid="link-story-visit">Find your closest stop <ArrowRight size={15} /></a>
        </div>
      </section>

      <section id="visit" className="scroll-mt-24 bg-[hsl(var(--accent))] px-5 py-20 text-[hsl(var(--primary))] lg:px-10 lg:py-28" aria-labelledby="visit-title">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div><p className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[hsl(var(--primary))]">See you soon</p><h2 id="visit-title" className="mt-4 font-display text-[clamp(3.5rem,7vw,6.7rem)] font-semibold leading-[.86] tracking-[-.065em]">Choose your<br /><em className="text-[hsl(var(--primary))]">closest stop.</em></h2><p className="mt-7 max-w-sm text-[1.05rem] leading-7 text-[hsl(var(--primary)/.76)]">No reservation required. Bring whoever makes you laugh, and we’ll take care of the rest. More Momty’s locations are on the way.</p></div>
          <div className="grid gap-5" data-testid="list-locations">
            {locations.map((location, index) => (
              <article key={location.id} className="rounded-[1.4rem] border border-[hsl(var(--primary)/.34)] bg-[hsl(var(--background))] p-7 text-[hsl(var(--primary))]" data-testid={`card-location-${location.id}`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3"><MapPin size={23} className="text-[hsl(var(--primary))]" /><span className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[hsl(var(--primary)/.68)]">Location {String(index + 1).padStart(2, "0")}</span></div>
                  <span className="font-mono-brand text-[10px] uppercase tracking-[.14em] text-[hsl(var(--primary))]">{location.neighborhood}</span>
                </div>
                <h3 className="mt-6 font-display text-3xl">Momty’s {location.name}</h3>
                <p className="mt-2 text-sm text-[hsl(var(--primary)/.72)]">{location.address} · {location.city}</p>
                {location.status === "open" ? (
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div><Clock3 size={20} className="text-[hsl(var(--primary))]" /><h4 className="mt-3 font-display text-xl">Hours</h4><p className="mt-2 font-mono-brand text-[11px] leading-7 text-[hsl(var(--primary)/.76)]">{location.hours.map((hours) => <span key={hours} className="block">{hours}</span>)}</p></div>
                    <div><Phone size={20} className="text-[hsl(var(--primary))]" /><h4 className="mt-3 font-display text-xl">Call ahead</h4><a href={location.phoneHref} className="mt-2 inline-flex font-mono-brand text-[11px] tracking-[.08em] text-[hsl(var(--primary)/.84)] underline underline-offset-4" data-testid={`link-call-location-${location.id}`}>{location.phone}</a></div>
                  </div>
                ) : (
                  <div className="mt-7">
                    <span className="inline-flex rounded-full bg-[hsl(var(--primary))] px-4 py-2 font-mono-brand text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary-foreground))]">Coming soon</span>
                    <p className="mt-4 text-sm text-[hsl(var(--primary)/.72)]">Opening date, hours, phone number, and menu will be announced soon.</p>
                  </div>
                )}
                <a href={location.directionsUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.15em] text-[hsl(var(--primary))] underline underline-offset-4" data-testid={`link-directions-${location.id}`}>Get directions <ArrowRight size={14} /></a>
                <a href={`/locations/${location.id}`} className="ml-5 inline-flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.15em] text-[hsl(var(--primary)/.82)] underline underline-offset-4" data-testid={`link-location-page-${location.id}`}>View menu <ArrowRight size={14} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[hsl(var(--accent))] px-5 py-9 text-[hsl(var(--accent-foreground))] lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div><p className="font-display text-3xl font-semibold">Momty's Grill</p><p className="mt-2 font-mono-brand text-[9px] uppercase tracking-[.17em] text-[hsl(var(--accent-foreground)/.62)]">Good food · good people · South Side Chicago</p></div>
          <div className="flex items-center gap-6 font-mono-brand text-[10px] uppercase tracking-[.13em] text-[hsl(var(--accent-foreground)/.72)]"><a href="#top" className="hover:text-[hsl(var(--secondary))]" data-testid="link-back-top">Back to top</a><span>© 2024 Momty's Grill</span></div>
        </div>
      </footer>
    </main>
  );
}

function LocationPage({ params }: { params: { id: string } }) {
  const location = locations.find((entry) => entry.id === params.id);

  if (!location) return <NotFound />;

  const locationIndex = locations.findIndex((entry) => entry.id === location.id);

  return (
    <main className="min-h-screen bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
      <header className="border-b border-[hsl(var(--accent-foreground)/.16)] bg-[hsl(var(--accent))] px-5 py-4 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <BrandMark />
          <a href={location.menuImages.length > 0 ? "#location-menu" : "/#visit"} className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent-foreground)/.3)] px-5 py-3 font-mono-brand text-[10px] uppercase tracking-[.15em] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]" data-testid="link-location-menu">{location.menuImages.length > 0 ? "View this menu" : "All locations"} <ArrowRight size={15} /></a>
        </div>
      </header>

      <section className="relative isolate overflow-hidden border-b border-[hsl(var(--accent-foreground)/.16)] px-5 py-20 lg:px-10 lg:py-32">
        <div className="absolute inset-0 bg-[url('/momtys-grill-hero.png')] bg-cover bg-center opacity-[.12]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--accent)/.45)] to-[hsl(var(--accent))]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[hsl(var(--secondary))]">Momty’s Grill · Location {String(locationIndex + 1).padStart(2, "0")}</p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(4rem,10vw,9rem)] font-semibold leading-[.84] tracking-[-.07em]">Momty’s<br /><em className="text-[hsl(var(--secondary))]">{location.name}.</em></h1>
          <p className="mt-8 max-w-xl text-[1.1rem] leading-7 text-[hsl(var(--accent-foreground)/.72)]">{location.address} · {location.city}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {location.status === "open" ? <a href={location.phoneHref} className="inline-flex items-center gap-3 rounded-full bg-[hsl(var(--secondary))] px-6 py-4 font-mono-brand text-[10px] uppercase tracking-[.15em] text-[hsl(var(--foreground))] transition-transform hover:-translate-y-1" data-testid="link-location-call"><Phone size={15} /> Call {location.phone}</a> : <span className="inline-flex items-center rounded-full bg-[hsl(var(--secondary))] px-6 py-4 font-mono-brand text-[10px] uppercase tracking-[.15em] text-[hsl(var(--foreground))]" data-testid="text-location-coming-soon">Coming soon</span>}
            <a href={location.directionsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full border border-[hsl(var(--accent-foreground)/.35)] px-6 py-4 font-mono-brand text-[10px] uppercase tracking-[.15em] transition-colors hover:border-[hsl(var(--secondary))] hover:text-[hsl(var(--secondary))]" data-testid="link-location-directions"><MapPin size={15} /> Get directions</a>
          </div>
        </div>
      </section>

      {location.menuImages.length > 0 ? (
        <section id="location-menu" className="scroll-mt-8 bg-[hsl(var(--background))] px-5 py-20 text-[hsl(var(--foreground))] lg:px-10 lg:py-28" aria-labelledby="location-menu-title">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[hsl(var(--primary))]">{location.name} location</p>
                <h2 id="location-menu-title" className="mt-4 font-display text-[clamp(3.5rem,7vw,6.5rem)] font-semibold leading-[.86] tracking-[-.06em]">The full<br /><em className="text-[hsl(var(--primary))]">menu.</em></h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">Tap any menu page to open it full size. Prices and availability shown are for Momty’s {location.name}.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" data-testid="gallery-location-menu">
              {location.menuImages.map((menuPage, index) => (
                <a key={menuPage.src} href={menuPage.src} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-[1.25rem] border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm transition-transform hover:-translate-y-1" data-testid={`link-menu-page-${index + 1}`}>
                  <img src={menuPage.src} alt={menuPage.alt} className="h-auto w-full" loading={index < 2 ? "eager" : "lazy"} />
                  <div className="flex items-center justify-between gap-4 border-t border-[hsl(var(--border))] px-5 py-4">
                    <div><p className="font-mono-brand text-[9px] uppercase tracking-[.18em] text-[hsl(var(--muted-foreground))]">Menu page {String(index + 1).padStart(2, "0")}</p><h3 className="mt-1 font-display text-xl">{menuPage.title}</h3></div>
                    <ArrowDownRight size={18} className="-rotate-45 text-[hsl(var(--primary))] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section id="location-menu" className="bg-[hsl(var(--background))] px-5 py-16 text-center text-[hsl(var(--foreground))] lg:px-10">
          <p className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[hsl(var(--primary))]">{location.name} location</p>
          <h2 className="mt-4 font-display text-4xl">Location menu coming soon.</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">This location has its own menu. Check back soon for the complete selection.</p>
        </section>
      )}

      <section className="px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-[1.4rem] border border-[hsl(var(--accent-foreground)/.18)] p-7 sm:p-10">
            <div className="flex items-center gap-3"><Clock3 size={23} className="text-[hsl(var(--secondary))]" /><p className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[hsl(var(--secondary))]">{location.status === "open" ? "Hours at this location" : "Opening details"}</p></div>
            {location.status === "open" ? <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {location.hours.map((hours) => <p key={hours} className="border-t border-[hsl(var(--accent-foreground)/.18)] pt-3 font-mono-brand text-[11px] leading-6 text-[hsl(var(--accent-foreground)/.76)]">{hours}</p>)}
            </div> : <p className="mt-8 border-t border-[hsl(var(--accent-foreground)/.18)] pt-5 text-sm leading-6 text-[hsl(var(--accent-foreground)/.72)]">The opening date, hours, and phone number will be posted here when confirmed.</p>}
          </div>
          <div className="rounded-[1.4rem] bg-[hsl(var(--primary))] p-7 text-[hsl(var(--primary-foreground))] sm:p-10">
            <MapPin size={23} className="text-[hsl(var(--secondary))]" />
            <h2 className="mt-6 font-display text-3xl">{location.status === "open" ? "Come see us." : "Opening soon."}</h2>
            <p className="mt-3 text-sm leading-6 text-[hsl(var(--primary-foreground)/.7)]">{location.status === "open" ? "Find your closest Momty’s, bring your people, and come hungry." : "Momty’s is coming to 9 E 111th St. Opening details will be announced soon."}</p>
            <a href={location.menuImages.length > 0 ? "#location-menu" : "/#visit"} className="mt-7 inline-flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.15em] text-[hsl(var(--secondary))] underline underline-offset-4" data-testid="link-location-browse-menu">{location.menuImages.length > 0 ? "View this menu" : "View all locations"} <ArrowRight size={14} /></a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[hsl(var(--accent-foreground)/.16)] px-5 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <p className="font-display text-2xl font-semibold">Momty’s Grill</p>
          <a href="/" className="font-mono-brand text-[10px] uppercase tracking-[.15em] text-[hsl(var(--accent-foreground)/.7)] underline underline-offset-4 hover:text-[hsl(var(--secondary))]" data-testid="link-location-home">Back to all locations</a>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/locations/:id" component={LocationPage} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;