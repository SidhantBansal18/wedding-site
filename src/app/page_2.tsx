// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Calendar, MapPin, Mail, PartyPopper, Plane, Hotel, Info } from "lucide-react";

// export default function WeddingSite() {
//   const [entered, setEntered] = useState(false);

//   // Splash shown until user taps/clicks
//   if (!entered) {
//     return <Splash onEnter={() => setEntered(true)} />;
//   }

//   return (
//     <div className="min-h-screen bg-rose-50 text-stone-800">
//       {/* 🔊 Background music: place your file at /public/music.mp3 */}
//       <audio src="/music.mp3" autoPlay loop hidden />

//       <DecorCorners />
//       <Header />
//       <main className="mx-auto max-w-5xl px-4">
//         <Hero />
//         <RSVP />
//         <Schedule />
//         <Accommodations />
//         <HelpfulInfo />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// /* ---------- Splash (no useEffect; full-screen button) ---------- */
// function Splash({ onEnter }: { onEnter: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
//       {/* Full-screen hit target captures any click/tap */}
//       <button
//         type="button"
//         onClick={onEnter}
//         className="absolute inset-0 h-full w-full cursor-pointer"
//         aria-label="Tap anywhere to enter the site"
//       />
//       <div className="relative z-10 flex flex-col items-center select-none">
//         <img src="/logo.png" alt="Shubham & Akansha monogram" className="h-40 w-40 object-contain" />
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="mt-6 text-stone-600"
//         >
//           Tap anywhere to continue
//         </motion.p>
//       </div>
//     </div>
//   );
// }

// /* ---------- Site Sections ---------- */
// function Header() {
//   return (
//     <header className="sticky top-0 z-40 backdrop-blur bg-rose-50/70 border-b border-rose-100">
//       <nav className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
//         <a href="#home" className="font-serif text-xl tracking-wide">
//           Shubham <span className="text-rose-500">&</span> Akansha
//         </a>
//         <div className="hidden gap-6 md:flex text-sm">
//           <a className="hover:text-rose-600" href="#rsvp">RSVP</a>
//           <a className="hover:text-rose-600" href="#schedule">Schedule</a>
//           <a className="hover:text-rose-600" href="#travel">Travel & Stay</a>
//           <a className="hover:text-rose-600" href="#info">Helpful Info</a>
//         </div>
//       </nav>
//     </header>
//   );
// }

// function Hero() {
//   return (
//     <section id="home" className="relative py-20 md:py-28">
//       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
//         <div className="mx-auto mb-6 h-28 w-28 rounded-full bg-rose-200/60 flex items-center justify-center overflow-hidden">
//           <img src="/logo.png" alt="Shubham & Akansha Logo" className="h-20 w-20 object-contain" />
//         </div>
//         <h1 className="font-serif text-4xl md:text-6xl">
//           Shubham <span className="text-rose-500">&</span> Akansha
//         </h1>
//         <p className="mt-2 text-stone-600">are getting married</p>
//         <div className="mt-4 flex items-center justify-center gap-2 text-stone-700">
//           <Calendar className="h-5 w-5" />
//           <span className="font-medium">23–25 November 2025</span>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

// function RSVP() {
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     setStatus(null);
//     const formData = new FormData(e.currentTarget);
//     const payload = Object.fromEntries(formData.entries());

//     try {
//       const res = await fetch("/api/rsvp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       if (res.ok) setStatus({ ok: true, msg: "Thank you! We received your RSVP." });
//       else setStatus({ ok: false, msg: "Something went wrong. Please try again." });
//     } catch {
//       setStatus({ ok: false, msg: "Network error. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <section id="rsvp" className="scroll-mt-24 py-14">
//       <div className="mx-auto max-w-2xl text-center">
//         <h2 className="font-serif text-3xl md:text-4xl">You're invited to our wedding!</h2>
//         <p className="mt-2 text-stone-600">Kindly RSVP to help us plan your stay and pickups.</p>
//       </div>
//       <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-2xl rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
//         <div className="grid gap-4 md:grid-cols-2">
//           <div>
//             <label className="mb-1 block text-sm font-medium">Full Name</label>
//             <input name="name" required className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 outline-none ring-rose-200 focus:ring" />
//           </div>
//           <div>
//             <label className="mb-1 block text-sm font-medium">Email Address</label>
//             <input type="email" name="email" required className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 outline-none ring-rose-200 focus:ring" />
//           </div>
//           <div className="md:col-span-2">
//             <label className="mb-1 block text-sm font-medium">Will you attend?</label>
//             <div className="flex flex-wrap gap-3">
//               <label className="inline-flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-2">
//                 <input type="radio" name="attending" value="yes" required /> We'll be there!
//               </label>
//               <label className="inline-flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-2">
//                 <input type="radio" name="attending" value="no" required /> Can't make it
//               </label>
//             </div>
//           </div>
//           <div className="md:col-span-2">
//             <label className="mb-1 block text-sm font-medium">When will you arrive?</label>
//             <select name="arrival" className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 outline-none ring-rose-200 focus:ring">
//               <option value="">-- Select a date --</option>
//               <option>November 23rd (Sagan)</option>
//               <option>November 24th (Haldi)</option>
//               <option>November 25th (Wedding)</option>
//             </select>
//           </div>
//           <div className="md:col-span-2">
//             <label className="mb-1 block text-sm font-medium">Any message?</label>
//             <textarea name="message" rows={3} className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 outline-none ring-rose-200 focus:ring" />
//           </div>
//         </div>
//         <div className="mt-6 flex items-center gap-3">
//           <button disabled={loading} className="rounded-2xl bg-rose-600 px-5 py-2.5 text-white shadow hover:bg-rose-700 disabled:opacity-60">
//             {loading ? "Sending..." : "Send RSVP"}
//           </button>
//           {status && <span className={status.ok ? "text-green-700" : "text-red-700"}>{status.msg}</span>}
//         </div>
//       </form>
//     </section>
//   );
// }

// function Schedule() {
//   const items = [
//     { title: "Sagan Ceremony", time: "Nov 23, 2025 • 8:00 PM onwards", venue: "Starland Banquets, Mayapuri", link: "https://share.google/yLB3X1sItx6lEYDme" },
//     { title: "Haldi", time: "Nov 24, 2025 • 10:00 AM onwards", venue: "Casa Royal, Mayapuri", link: "https://share.google/kFOdArHNtVFSlRkwy" },
//     { title: "Wedding", time: "Nov 25, 2025 • 8:00 PM onwards", venue: "Ambria Exotica, Dwarka Expressway", link: "https://share.google/0wjr0cATP5Bv6AqQG" },
//   ];

//   return (
//     <section id="schedule" className="scroll-mt-24 py-16">
//       <div className="mb-8 text-center">
//         <h2 className="font-serif text-3xl md:text-4xl">Here's what we have in store</h2>
//       </div>
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {items.map((it) => (
//           <motion.div
//             key={it.title}
//             initial={{ opacity: 0, y: 8 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.4 }}
//             className="group overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm"
//           >
//             <div className="aspect-[4/3] bg-rose-100/40 flex items-center justify-center text-center p-4">
//               <div>
//                 <h3 className="font-serif text-xl">{it.title}</h3>
//                 <p className="mt-1 text-sm text-stone-600">{it.time}</p>
//                 <p className="mt-1 text-sm text-stone-700">{it.venue}</p>
//                 <a href={it.link} target="_blank" className="mt-2 inline-block text-rose-600 underline text-sm" rel="noreferrer">
//                   Open in Maps
//                 </a>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// function Accommodations() {
//   return (
//     <section id="travel" className="scroll-mt-24 py-16">
//       <div className="mb-8 text-center">
//         <h2 className="font-serif text-3xl md:text-4xl">Travel & Stay</h2>
//       </div>
//       <div className="grid gap-6 md:grid-cols-2">
//         <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
//           <div className="flex items-center gap-2 text-stone-700">
//             <Hotel className="h-5 w-5" />
//             <h3 className="font-semibold">Accommodations</h3>
//           </div>
//           <p className="mt-2 text-stone-700">
//             Rooms for out-of-town guests will be coordinated by the families. Details will be shared after you RSVP.
//           </p>
//         </div>
//         <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
//           <div className="flex items-center gap-2 text-stone-700">
//             <Plane className="h-5 w-5" />
//             <h3 className="font-semibold">Travel</h3>
//           </div>
//           <p className="mt-2 text-stone-700">All venues are in and around Delhi NCR. Cabs and app-based rides are readily available.</p>
//         </div>
//       </div>
//     </section>
//   );
// }

// function HelpfulInfo() {
//   const attire = [
//     { label: "Sagan Ceremony", text: "Formal / Indo Western" },
//     { label: "Haldi", text: "Shades of yellow" },
//     { label: "Wedding", text: "Traditional Indian attire" },
//   ];

//   return (
//     <section id="info" className="scroll-mt-24 py-16">
//       <div className="mb-8 text-center">
//         <h2 className="font-serif text-3xl md:text-4xl">Helpful Info</h2>
//       </div>
//       <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
//         <div className="flex items-center gap-2 text-stone-700">
//           <Info className="h-5 w-5" />
//           <h3 className="font-semibold">Wedding Attire Guide (Just to help you pack!)</h3>
//         </div>
//         <p className="mt-2 text-stone-700">These are light pointers—please wear what makes you feel like celebrating!</p>
//         <ul className="mt-4 grid gap-3 sm:grid-cols-2">
//           {attire.map((a) => (
//             <li key={a.label} className="rounded-xl border border-rose-100 bg-rose-50/60 p-4">
//               <p className="font-medium">✨ {a.label}</p>
//               <p className="text-stone-700">{a.text}</p>
//             </li>
//           ))}
//         </ul>
//         <p className="mt-4 text-stone-700">
//           For any questions, email us at{" "}
//           <a href="mailto:contactus@shubhamandakansha.com" className="text-rose-700 underline inline-flex items-center gap-1">
//             <Mail className="h-4 w-4" /> contactus@shubhamandakansha.com
//           </a>
//         </p>
//       </div>
//     </section>
//   );
// }

// function Footer() {
//   return (
//     <footer className="border-t border-rose-100 py-10 text-center text-sm text-stone-600">
//       <p>© {new Date().getFullYear()} Shubham & Akansha — With love.</p>
//     </footer>
//   );
// }

// function DecorCorners() {
//   return (
//     <>
//       <div className="pointer-events-none fixed left-2 top-2 h-24 w-24 rounded-3xl bg-rose-100/50 blur-2xl" />
//       <div className="pointer-events-none fixed bottom-2 right-2 h-24 w-24 rounded-3xl bg-rose-100/50 blur-2xl" />
//     </>
//   );
// }
