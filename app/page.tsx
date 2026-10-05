'use client'

import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, CalendarDays, ImagePlus, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { templates } from '@/lib/templates'

function TemplateVisual({ index }: { index:number }) {
  const colors = ['#d8ff45','#9bd7ff','#e8c36a','#ff8b4a','#171717','#a8d48a','#bca6ff','#75dfe0','#ffe36e','#c94d4d','#f1a4ca','#8796ff']
  return <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-black/10 bg-white p-3">
    <div className="absolute inset-3 rounded-[20px] overflow-hidden" style={{background:`linear-gradient(145deg, ${colors[index]}, #f8f7f1 58%)`}}>
      <div className="absolute -right-10 top-12 h-44 w-44 rounded-full bg-white/45 blur-sm" />
      <div className="absolute left-5 top-5 text-[10px] font-bold uppercase tracking-[.18em]">2027</div>
      <div className="absolute left-5 right-5 bottom-5">
        <div className="mb-2 text-[9px] uppercase tracking-[.25em] opacity-60">Calendar / {String(index+1).padStart(2,'0')}</div>
        <div className="display text-4xl leading-[.85] font-semibold">{['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][index]}</div>
      </div>
      <div className="absolute left-5 top-1/2 h-28 w-24 -translate-y-1/2 rounded-[16px] border border-black/15 bg-black/10 backdrop-blur-sm" />
    </div>
  </div>
}

export default function Home() {
  return <main className="min-h-screen overflow-hidden">
    <header className="fixed left-0 right-0 top-0 z-50 px-5 py-5 md:px-8">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-black/10 bg-[#f5f3ed]/80 px-5 py-3 backdrop-blur-xl">
        <Link href="/" className="display text-xl font-bold tracking-[-.05em]">CALENDA<span className="text-black/30">.</span></Link>
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex"><a href="#templates">Templates</a><a href="#process">How it works</a><a href="#about">About</a></nav>
        <Link href="/login" className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105">Sign in</Link>
      </div>
    </header>

    <section className="grid-bg relative flex min-h-[92vh] items-end px-5 pb-14 pt-36 md:px-10 md:pb-20">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
        <div className="reveal">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em]"><Sparkles size={14}/> Personalized print, reimagined</div>
          <h1 className="display max-w-5xl text-[clamp(4.5rem,11vw,10.5rem)] font-semibold leading-[.78]">Make a calendar<br/><span className="italic font-normal">worth keeping.</span></h1>
        </div>
        <div className="reveal max-w-md pb-2" style={{animationDelay:'.12s'}}>
          <p className="text-lg leading-7 text-black/65">Choose a design. Add a doctor, team or product image. We compose a complete 12-page calendar in seconds.</p>
          <Link href="/dashboard/templates" className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-6 py-4 font-semibold text-white transition-all hover:-translate-y-1 hover:pr-8">Create your calendar <ArrowUpRight size={18}/></Link>
        </div>
      </div>
    </section>

    <div className="marquee border-y border-black/10 bg-[#d8ff45] py-3 text-sm font-bold uppercase tracking-[.2em]"><div className="marquee-track">DESIGN → UPLOAD → COMPOSE → PREVIEW → PRINT → DESIGN → UPLOAD → COMPOSE → PREVIEW → PRINT → </div></div>

    <section id="templates" className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-black/45">01 / The collection</p><h2 className="display text-5xl font-semibold md:text-7xl">Pick your point<br/><span className="font-normal italic">of view.</span></h2></div><p className="max-w-sm text-black/55">Twelve original layouts. Each one is built around the image you upload.</p></div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{templates.map((t,i)=><Link href="/dashboard/templates" key={t.id} className="card-lift group"><TemplateVisual index={i}/><div className="flex items-center justify-between px-1 py-4"><div><p className="font-semibold">{t.name}</p><p className="text-xs text-black/45">{t.category}</p></div><ArrowUpRight className="opacity-30 transition-opacity group-hover:opacity-100" size={18}/></div></Link>)}</div>
      </div>
    </section>

    <section id="process" className="bg-black px-5 py-24 text-white md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><p className="mb-12 text-xs font-bold uppercase tracking-[.2em] text-white/40">02 / Simple by design</p><div className="grid gap-5 md:grid-cols-3">{[{n:'01',icon:CalendarDays,title:'Choose',text:'Start with one of twelve professionally designed calendar systems.'},{n:'02',icon:ImagePlus,title:'Upload',text:'Drop in a high-resolution image. Crop and position it exactly how you want.'},{n:'03',icon:ArrowDownRight,title:'Preview',text:'See all twelve months together, then save your finished calendar as PDF.'}].map(s=>{const Icon=s.icon;return <div key={s.n} className="group rounded-[30px] border border-white/15 p-7 transition-colors hover:bg-white hover:text-black"><div className="mb-20 flex items-center justify-between"><span className="text-sm text-white/40 group-hover:text-black/40">{s.n}</span><Icon size={22}/></div><h3 className="display text-4xl font-medium">{s.title}</h3><p className="mt-4 max-w-xs text-white/50 group-hover:text-black/55">{s.text}</p></div>})}</div></div></section>

    <section id="about" className="px-5 py-24 md:px-10 md:py-32"><div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-2"><div><p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-black/40">03 / Built for real print</p><h2 className="display text-5xl font-semibold md:text-7xl">From upload<br/>to <span className="italic font-normal">paper.</span></h2></div><div className="flex items-end"><p className="max-w-xl text-xl leading-8 text-black/60">The digital experience is only the beginning. Our template system is designed so the same composition can become a production-ready calendar when you are ready to print.</p></div></div></section>

    <footer className="border-t border-black/10 px-5 py-8 md:px-10"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 text-sm text-black/50 md:flex-row"><span>© 2026 Calenda</span><span>Personalized calendars, made simple.</span><Link href="/login" className="font-semibold text-black">Start creating →</Link></div></footer>
  </main>
}
