"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Mail, PartyPopper, Plane, Hotel, Info } from "lucide-react";

/**
 * Festive Indian-wedding themed page (Next.js App Router)
 * - Splash gate with tap-to-enter + background music
 * - Decorative ornaments, petals, floral dividers, gold/saffron palette
 * - GitHub Pages friendly using `prefix` for static assets
 *
 * ✅ Change `REPO_NAME` below to your GitHub repo if deploying to GitHub Pages
 */
const REPO_NAME = "wedding-site"; // ← TODO: set to your repo name if using GitHub Pages
const prefix = process.env.NODE_ENV === "production" ? `/${REPO_NAME}` : "";

export default function WeddingSite() {
  const [entered, setEntered] = useState(false);

  // Splash shown until user taps/clicks
  if (!entered) {
    return <Splash prefix={prefix} onEnter={() => setEntered(true)} />;
  }

  return (
    <div className="min-h-screen bg-rose-50 text-stone-800 relative overflow-x-hidden">
      {/* 🔊 Background music: place your file at /public/music.mp3 */}
      <audio src={`${prefix}/music.mp3`} autoPlay loop hidden />

      {/* Optional falling petals for a festive vibe */}
      <Petals />

      <DecorCorners />
      <Header />
      <main className="mx-auto max-w-5xl px-4">
        <Hero prefix={prefix} />
        <FloralDivider />
        <SectionHeading>You&apos;re invited to our wedding!</SectionHeading>
        <RSVP />
        <FloralDivider />
        <SectionHeading>Here&apos;s what we have in store</SectionHeading>
        <Schedule />
        <FloralDivider />
        <SectionHeading>Travel &amp; Stay</SectionHeading>
        <Accommodations />
        <FloralDivider />
        <SectionHeading>Helpful Info</SectionHeading>
        <HelpfulInfo />
      </main>
      <Footer />
    </div>
  );
}

function Splash({ onEnter, prefix }: { onEnter: () => void; prefix: string }) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* --- Festive background layers (don't capture clicks) --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-orange-50 to-amber-50 pointer-events-none" />
      <div className="pointer-events-none"><PatternBG /></div>
      <div className="pointer-events-none"><MandalaCluster /></div>
      <div className="pointer-events-none">
        <Garland className="absolute left-0 right-0 top-0 mx-auto" />
      </div>

      {/* --- Full-screen CLICK/TAP target (on top) --- */}
      <button
        type="button"
        onClick={onEnter}
        className="absolute inset-0 z-20 h-full w-full cursor-pointer"
        aria-label="Tap anywhere to enter the site"
      />

      {/* --- Center card (visible above button, BUT not clickable) --- */}
      <div className="relative z-30 flex min-h-screen items-center justify-center p-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-[28px] bg-white/85 shadow-xl ring-1 ring-white/60 backdrop-blur-md"
        >
          <div className="h-1 w-full bg-gradient-to-r from-[var(--gold-500)] via-[var(--saffron-600)] to-[var(--maroon-700)]" />
          <div className="px-8 pb-8 pt-7 text-center">
            <div className="mx-auto mb-5 grid place-items-center rounded-full bg-white/80 p-3 ring-2 ring-[var(--gold-500)]">
              <img
                src={`${prefix}/logo.png`}
                alt="Shubham & Akansha monogram"
                className="h-24 w-24 object-contain"
              />
            </div>

            <h1 className="font-serif text-3xl text-[var(--maroon-700)]">
              Shubham <span className="text-[var(--saffron-600)]">&</span> Akansha
            </h1>
            <p className="mt-1 text-sm text-stone-600">23–25 November 2025 • Delhi NCR</p>

            <FloralDivider />
            <div className="mx-auto mt-1 mb-3 flex items-center justify-center">
              <Diya />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-2 text-stone-700"
            >
              Tap anywhere to continue
            </motion.p>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-[var(--maroon-700)] via-[var(--saffron-600)] to-[var(--gold-500)]" />
        </motion.div>
      </div>

      {/* Foreground glow (don’t capture clicks) */}
      <div className="pointer-events-none">
        <Bokeh />
      </div>
    </div>
  );
}


/* --- BG pattern (subtle jaali dots) --- */
function PatternBG() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden>
      <defs>
        <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#b45309" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

/* --- Mandala corners --- */
function MandalaCluster() {
  return (
    <>
      <Mandala className="absolute -left-10 -top-10 h-52 w-52 text-[var(--gold-500)]/30" />
      <Mandala className="absolute -right-12 top-1/3 h-64 w-64 text-[var(--maroon-700)]/20" />
      <Mandala className="absolute left-8 bottom-6 h-40 w-40 text-[var(--saffron-600)]/25" />
    </>
  );
}
function Mandala({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="46" />
        <circle cx="50" cy="50" r="36" strokeOpacity=".6" />
        <circle cx="50" cy="50" r="26" strokeOpacity=".4" />
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d={`M50 50 L ${50 + 46*Math.cos((i*Math.PI)/6)} ${50 + 46*Math.sin((i*Math.PI)/6)}`} />
        ))}
      </g>
    </svg>
  );
}

/* --- Garland --- */
function Garland({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ rotate: -1 }}
      animate={{ rotate: 1 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.5, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 1200 140" className="mx-auto h-28 w-full" aria-hidden>
        <path d="M0,20 C200,80 400,0 600,60 800,120 1000,40 1200,100" stroke="#8b5cf6" strokeOpacity="0" fill="none" />
        {Array.from({ length: 30 }).map((_, i) => {
          const x = (i / 29) * 1200;
          const y = 40 + 30 * Math.sin((i / 6) * Math.PI);
          return (
            <g key={i} transform={`translate(${x},${y})`}>
              <circle r="8" fill="#f59e0b" />
              <circle r="5" fill="#f97316" />
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}

/* --- Diya (animated flame) --- */
function Diya() {
  return (
    <div className="relative">
      <svg width="64" height="40" viewBox="0 0 64 40" aria-hidden>
        <path d="M8 26c8 10 40 10 48 0 0 0-10 8-24 8S8 26 8 26Z" fill="#8C3F2E" />
        <motion.path
          d="M32 6c5 6 5 12 0 16-5-4-5-10 0-16Z"
          initial={{ opacity: 0.9, scale: 0.95 }}
          animate={{ opacity: [0.8, 1, 0.85], scale: [0.95, 1.05, 0.98] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          fill="#FFA31A"
        />
        <motion.circle cx="32" cy="18" r="3" fill="#fff1" animate={{ opacity: [0.2, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 1.6 }} />
      </svg>
    </div>
  );
}

/* --- Foreground bokeh --- */
function Bokeh() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-24 w-24 rounded-full bg-amber-200/20 blur-2xl"
          style={{ left: `${(i * 9) % 100}%`, top: `${(i * 13) % 100}%` }}
          animate={{ opacity: [0.15, 0.35, 0.2] }}
          transition={{ repeat: Infinity, duration: 3 + (i % 4) }}
        />
      ))}
    </div>
  );
}

/* ---------- Decorative bits ---------- */
function FloralDivider() {
  return (
    <div className="my-10 flex items-center justify-center text-[var(--gold-500)]/80">
      <svg width="200" height="16" viewBox="0 0 200 16" fill="none" aria-hidden>
        <path d="M2 8h70" stroke="currentColor" strokeOpacity=".35" />
        <path d="M128 8h70" stroke="currentColor" strokeOpacity=".35" />
        <path d="M100 8c6-6 12-6 18 0-6 6-12 6-18 0Z" fill="currentColor" fillOpacity=".45" />
        <circle cx="100" cy="8" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-3">
      <span className="h-2 w-2 rounded-full bg-[var(--gold-500)]" />
      <h2 className="font-serif text-3xl md:text-4xl text-[var(--maroon-700)]">{children}</h2>
      <span className="h-2 w-2 rounded-full bg-[var(--gold-500)]" />
    </div>
  );
}

function DecorCorners() {
  return (
    <>
      <Ornament className="fixed left-3 top-3 opacity-30" />
      <Ornament className="fixed right-3 bottom-3 rotate-180 opacity-30" />
    </>
  );
}
function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-24 w-24 text-[var(--gold-500)] ${className}`} viewBox="0 0 100 100" fill="none" aria-hidden>
      <path d="M10,90 Q40,60 70,90" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M10,80 Q40,50 70,80" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="15" cy="85" r="2" fill="currentColor"/>
      <circle cx="25" cy="78" r="1.5" fill="currentColor"/>
      <circle cx="35" cy="72" r="1.2" fill="currentColor"/>
      <circle cx="45" cy="68" r="1" fill="currentColor"/>
      <circle cx="55" cy="70" r="1.2" fill="currentColor"/>
      <circle cx="65" cy="76" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function Petals() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="pointer-events-none petal"
          style={{
            left: `${(i * 8) % 100}vw`,
            animationDuration: `${12 + (i % 5)}s`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
    </>
  );
}

/* ---------- Site Sections ---------- */
function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-rose-50/70 border-b border-rose-100">
      <nav className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
        <a href="#home" className="font-serif text-xl tracking-wide">
          Shubham <span className="text-[var(--saffron-600)]">&</span> Akansha
        </a>
        <div className="hidden gap-6 md:flex text-sm">
          <a className="hover:text-rose-600" href="#rsvp">RSVP</a>
          <a className="hover:text-rose-600" href="#schedule">Schedule</a>
          <a className="hover:text-rose-600" href="#travel">Travel & Stay</a>
          <a className="hover:text-rose-600" href="#info">Helpful Info</a>
        </div>
      </nav>
    </header>
  );
}

function Hero({ prefix }: { prefix: string }) {
  return (
    <section id="home" className="relative py-20 md:py-28 bg-festive">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
        <div className="mx-auto mb-6 h-28 w-28 rounded-full bg-white/70 ring-2 ring-[var(--gold-500)] flex items-center justify-center overflow-hidden">
          <img src={`${prefix}/logo.png`} alt="Shubham & Akansha Logo" className="h-20 w-20 object-contain" />
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-[var(--maroon-700)]">
          <span className="shimmer">Shubham</span> <span className="text-[var(--saffron-600)]">&</span> <span className="shimmer">Akansha</span>
        </h1>
        <p className="mt-2 text-stone-700">23–25 November 2025 • Delhi NCR</p>
        <div className="mt-4 flex items-center justify-center gap-2 text-stone-700">
          <Calendar className="h-5 w-5" />
          <span className="font-medium">Save the dates</span>
        </div>
        <div className="mt-6">
          <a href="#rsvp" className="inline-flex items-center gap-2 rounded-2xl bg-[var(--saffron-600)] px-6 py-3 text-white shadow-lg shadow-orange-600/20 hover:brightness-110">
            Join us in our happiness!
            <PartyPopper className="h-5 w-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function RSVP() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    // const formData = new FormData(e.currentTarget);
    // const payload = Object.fromEntries(formData.entries());
    const formData = new FormData(e.currentTarget);
    const guestName = (formData.get("name") as string) || "Friend";

    // TEMP: no backend yet (Pages is static). Swap to webhook later.
    await new Promise((r) => setTimeout(r, 400));
    // setStatus({ ok: true, msg: "Thanks! We’ll see you soon." });
    setStatus({ ok: true, msg: `Thanks, ${guestName}! We\u2019ll see you soon.` });
    setLoading(false);

    // Example for later:
    // const webhook = process.env.NEXT_PUBLIC_RSVP_WEBHOOK_URL;
    // if (webhook) await fetch(webhook, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) });
  }

  return (
    <section id="rsvp" className="scroll-mt-24 py-10">
      <form onSubmit={handleSubmit} className="mx-auto mt-4 max-w-2xl overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm">
        <div className="h-1 w-full bg-gradient-to-r from-[var(--gold-500)] via-[var(--saffron-600)] to-[var(--maroon-700)]" />
        <div className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Full Name</label>
              <input name="name" required className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 outline-none ring-rose-200 focus:ring" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email Address</label>
              <input type="email" name="email" required className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 outline-none ring-rose-200 focus:ring" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">Will you attend?</label>
              <div className="flex flex-wrap gap-3">
                <label className="inline-flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-2">
                  <input type="radio" name="attending" value="yes" required /> We&apos;ll be there!
                </label>
                <label className="inline-flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-2">
                  <input type="radio" name="attending" value="no" required /> Can&apos;t make it
                </label>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">When will you arrive?</label>
              <select name="arrival" className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 outline-none ring-rose-200 focus:ring">
                <option value="">-- Select a date --</option>
                <option>November 23rd (Sagan)</option>
                <option>November 24th (Haldi)</option>
                <option>November 25th (Wedding)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">Any message?</label>
              <textarea name="message" rows={3} className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 outline-none ring-rose-200 focus:ring" />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button disabled={loading} className="rounded-2xl bg-[var(--saffron-600)] px-5 py-2.5 text-white shadow hover:brightness-110 disabled:opacity-60">
              {loading ? "Sending..." : "Send RSVP"}
            </button>
            {status && <span className={status.ok ? "text-green-700" : "text-red-700"}>{status.msg}</span>}
          </div>
        </div>
      </form>
    </section>
  );
}

function Schedule() {
  const items = [
    { title: "Sagan Ceremony", time: "Nov 23, 2025 • 8:00 PM onwards", venue: "Starland Banquets, Mayapuri", link: "https://share.google/yLB3X1sItx6lEYDme" },
    { title: "Haldi", time: "Nov 24, 2025 • 10:00 AM onwards", venue: "Casa Royal, Mayapuri", link: "https://share.google/kFOdArHNtVFSlRkwy" },
    { title: "Wedding", time: "Nov 25, 2025 • 8:00 PM onwards", venue: "Ambria Exotica, Dwarka Expressway", link: "https://share.google/0wjr0cATP5Bv6AqQG" },
  ];

  return (
    <section id="schedule" className="scroll-mt-24 py-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <div className="h-1 w-full bg-gradient-to-r from-[var(--gold-500)] via-[var(--saffron-600)] to-[var(--maroon-700)]" />
            <div className="p-4 text-center">
              <h3 className="font-serif text-xl text-[var(--maroon-700)]">{it.title}</h3>
              <p className="mt-1 text-sm text-stone-600">{it.time}</p>
              <p className="mt-1 text-sm text-stone-700">{it.venue}</p>
              <a href={it.link} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center justify-center text-[var(--saffron-600)] underline text-sm">
                <MapPin className="h-4 w-4 mr-1" /> Open in Maps
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Accommodations() {
  return (
    <section id="travel" className="scroll-mt-24 py-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5">
          <div className="h-1 w-full bg-gradient-to-r from-[var(--gold-500)] via-[var(--saffron-600)] to-[var(--maroon-700)] mb-4" />
          <div className="flex items-center gap-2 text-stone-700">
            <Hotel className="h-5 w-5 text-[var(--maroon-700)]" />
            <h3 className="font-semibold">Accommodations</h3>
          </div>
          <p className="mt-2 text-stone-700">
            Rooms for out-of-town guests will be coordinated by the families. Details will be shared after you RSVP.
          </p>
        </div>
        <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5">
          <div className="h-1 w-full bg-gradient-to-r from-[var(--gold-500)] via-[var(--saffron-600)] to-[var(--maroon-700)] mb-4" />
          <div className="flex items-center gap-2 text-stone-700">
            <Plane className="h-5 w-5 text-[var(--maroon-700)]" />
            <h3 className="font-semibold">Travel</h3>
          </div>
          <p className="mt-2 text-stone-700">All venues are in and around Delhi NCR. Cabs and app-based rides are readily available.</p>
        </div>
      </div>
    </section>
  );
}

function HelpfulInfo() {
  const attire = [
    { label: "Sagan Ceremony", text: "Formal / Indo Western" },
    { label: "Haldi", text: "Shades of yellow" },
    { label: "Wedding", text: "Traditional Indian attire" },
  ];

  return (
    <section id="info" className="scroll-mt-24 py-6">
      <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-stone-700">
          <Info className="h-5 w-5 text-[var(--maroon-700)]" />
          <h3 className="font-semibold">Wedding Attire Guide (Just to help you pack!)</h3>
        </div>
        <p className="mt-2 text-stone-700">These are light pointers—please wear what makes you feel like celebrating!</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {attire.map((a) => (
            <li key={a.label} className="rounded-xl border border-rose-100 bg-rose-50/60 p-4">
              <p className="font-medium">✨ {a.label}</p>
              <p className="text-stone-700">{a.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-stone-700">
          For any questions, email us at{" "}
          <a href="mailto:contactus@shubhamandakansha.com" className="text-[var(--saffron-600)] underline inline-flex items-center gap-1">
            <Mail className="h-4 w-4" /> contactus@shubhamandakansha.com
          </a>
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-rose-100 py-10 text-center text-sm text-stone-600">
      <div className="mx-auto mb-4 h-[2px] w-24 bg-[var(--gold-500)]/60" />
      <p>© {new Date().getFullYear()} Shubham & Akansha — With love.</p>
    </footer>
  );
}
