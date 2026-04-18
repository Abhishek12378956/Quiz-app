import Navbar from '../components/Navbar'
import Banner from '../components/Banner'

const features = [
  {
    icon: '⏱️',
    title: '5-Minute Timer',
    desc: 'Race against the clock to answer all 10 questions before time runs out.',
  },
  {
    icon: '🎯',
    title: 'Instant Results',
    desc: 'Get your score with detailed feedback and emoji-based performance rating.',
  },
  {
    icon: '🛡️',
    title: 'Protected Quiz',
    desc: 'Login required to take the quiz. Your progress is secure and private.',
  },
  {
    icon: '🗂️',
    title: 'Admin Tools',
    desc: 'Admins can create and manage quiz questions from a dedicated panel.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      <Navbar variant="home" />
      <Banner />

      {/* Feature Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-display text-3xl text-slate-200 text-center mb-12">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card hover:border-slate-600 transition-colors duration-200">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-brand font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        © {new Date().getFullYear()} QuizMaster — Built with React + Vite + Tailwind CSS
      </footer>
    </div>
  )
}
