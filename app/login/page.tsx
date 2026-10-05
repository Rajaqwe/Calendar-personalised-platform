'use client'

import { ArrowRight, LockKeyhole, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Login() {
  const [mode, setMode] = useState<'login'|'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    const supabase = createClient()
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } })
    setBusy(false)
    if (result.error) { setMessage(result.error.message); return }
    if (mode === 'signup' && !result.data.session) {
      setMessage('Account created. Check your email to confirm your account.')
      return
    }
    window.location.href = '/dashboard/templates'
  }

  return <main className="grid-bg min-h-screen px-5 py-6 md:px-10">
    <div className="mx-auto flex max-w-[1440px] items-center justify-between"><Link href="/" className="display text-xl font-bold">CALENDA.</Link><Link href="/" className="text-sm text-black/50">Back to home</Link></div>
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
      <div className="reveal w-full max-w-md rounded-[34px] border border-black/10 bg-white/80 p-7 shadow-[0_30px_100px_rgba(0,0,0,.08)] backdrop-blur-xl md:p-10">
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d8ff45]"><LockKeyhole size={20}/></div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-black/40">Your workspace</p>
        <h1 className="display text-5xl font-semibold">{mode==='login'?'Welcome back.':'Create account.'}</h1>
        <p className="mt-3 text-black/55">{mode==='login'?'Continue creating beautiful calendars.':'Save your calendar projects and come back anytime.'}</p>
        <form onSubmit={submit} className="mt-8 space-y-4">
          {mode === 'signup' && <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-2xl border border-black/10 bg-[#f5f3ed] px-5 py-4 outline-none focus:border-black" placeholder="Full name" required/>}
          <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-2xl border border-black/10 bg-[#f5f3ed] px-5 py-4 outline-none focus:border-black" placeholder="Email address" type="email" required/>
          <input value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-2xl border border-black/10 bg-[#f5f3ed] px-5 py-4 outline-none focus:border-black" placeholder="Password" type="password" minLength={6} required/>
          <button disabled={busy} className="flex w-full items-center justify-between rounded-2xl bg-black px-5 py-4 font-semibold text-white disabled:opacity-60">{busy ? 'Working…' : mode==='login'?'Sign in':'Create account'}{busy?<Loader2 className="animate-spin" size={18}/>:<ArrowRight size={18}/>}</button>
        </form>
        {message && <p className="mt-4 rounded-2xl bg-black/5 px-4 py-3 text-sm text-black/65">{message}</p>}
        <button onClick={()=>{setMode(mode==='login'?'signup':'login');setMessage('')}} className="mt-7 w-full text-sm text-black/55 underline underline-offset-4">{mode==='login'?"Don't have an account? Create one":"Already have an account? Sign in"}</button>
      </div>
    </div>
  </main>
}
