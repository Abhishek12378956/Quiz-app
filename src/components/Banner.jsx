import { Link } from 'react-router-dom'

export default function Banner() {
  return (
    <section className="w-full bg-gradient-to-br from-[#0a1628] via-[#0f2240] to-[#0a1628] border-b border-slate-800 py-24 px-6 text-center">
      <div className="text-6xl mb-5">🧠</div>
      <h1 className="font-display text-5xl font-bold text-brand mb-4 leading-tight">
        Test Your Knowledge
      </h1>
      <p className="text-slate-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
        Challenge yourself with our timed quiz platform. Admins build questions — users compete against the clock.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          to="/user"
          className="btn-primary text-base px-8 py-3 no-underline inline-block"
        >
          Take a Quiz →
        </Link>
        <Link
          to="/admin"
          className="btn-outline text-base px-7 py-3 no-underline inline-block"
        >
          Admin Panel
        </Link>
      </div>
    </section>
  )
}
