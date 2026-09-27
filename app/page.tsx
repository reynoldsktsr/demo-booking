import { BookingWidget } from "./booking-widget";

const SERVICES = [
  { name: "Haircut & Style", duration: "45 min", price: "$65" },
  { name: "Color & Highlights", duration: "2 hr", price: "$150" },
  { name: "Blowout", duration: "30 min", price: "$45" },
  { name: "Deep Conditioning Treatment", duration: "30 min", price: "$35" },
  { name: "Facial", duration: "60 min", price: "$85" },
  { name: "Massage", duration: "60 min", price: "$95" },
  { name: "Manicure", duration: "30 min", price: "$30" },
  { name: "Pedicure", duration: "45 min", price: "$45" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-serif text-lg text-stone-900">Willow Salon &amp; Spa</span>
          <div className="flex gap-6 text-sm text-stone-600">
            <a href="#services" className="hover:text-stone-900">
              Services
            </a>
            <a href="#about" className="hover:text-stone-900">
              About
            </a>
            <a href="#book" className="rounded-full bg-rose-800 px-4 py-1.5 text-white hover:bg-rose-700">
              Book now
            </a>
          </div>
        </div>
      </nav>

      <header className="bg-stone-900">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-rose-400">
            Hair · Skin · Massage
          </p>
          <h1 className="mt-4 font-serif text-4xl text-stone-50 sm:text-5xl">
            An hour to yourself, actually
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-stone-300">
            Book online in under a minute — pick a service, see what&apos;s actually open today,
            and get a confirmation on the spot.
          </p>
          <a
            href="#book"
            className="mt-8 inline-block rounded-full bg-rose-700 px-6 py-3 text-sm font-medium text-white hover:bg-rose-600"
          >
            Book an appointment
          </a>
        </div>
      </header>

      <section id="about" className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="font-serif text-2xl text-stone-900">About us</h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Willow opened as a two-chair salon and grew one referral at a time. We still keep the
          book small enough that your stylist remembers what you asked for last time, and the
          schedule honest enough that a booked slot means a booked slot.
        </p>
      </section>

      <section id="services" className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-center font-serif text-2xl text-stone-900">Services</h2>
          <ul className="mt-10 divide-y divide-stone-200">
            {SERVICES.map((s) => (
              <li key={s.name} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-stone-800">{s.name}</p>
                  <p className="text-sm text-stone-500">{s.duration}</p>
                </div>
                <span className="text-stone-500">{s.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="book" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center font-serif text-2xl text-stone-900">Book an appointment</h2>
        <div className="mt-10">
          <BookingWidget />
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-6 py-10 text-center text-sm text-stone-500">
        <p>27 Main Street · Tue–Sat, 9am–5pm</p>
        <p className="mt-3 text-xs text-stone-400">
          Example site built to show what a working appointment scheduler looks like — not a real
          business. Built by{" "}
          <a href="https://k-reynolds.com" className="underline hover:text-stone-600">
            k-reynolds.com
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
