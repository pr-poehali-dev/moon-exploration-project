import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Icon from '@/components/ui/icon'
import { Logo } from '@/components/logo'

const GENRES = ['Поп', 'Рок', 'Рэп/Хип-хоп', 'Электронная', 'Джаз', 'R&B', 'Классика', 'Фолк', 'Инди']
const MOODS = ['Грустная', 'Весёлая', 'Романтичная', 'Агрессивная', 'Меланхоличная', 'Вдохновляющая', 'Расслабляющая', 'Энергичная']

interface Track {
  id: number
  title: string
  lyrics: string
  genre: string | null
  mood: string | null
  status: string
}

export default function CreateTrack() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [genre, setGenre] = useState('')
  const [mood, setMood] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<Track | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { ok, data } = await api.createTrack({ title, prompt, genre, mood })
    setLoading(false)
    if (!ok) {
      setError(data.error || 'Ошибка при создании трека')
    } else {
      setResult(data.track)
    }
  }

  if (result) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="border-b border-red-500/20 px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard"><Logo size="sm" /></Link>
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="border-zinc-700 text-gray-300 hover:border-red-500 hover:text-white bg-transparent">
              На дашборд
            </Button>
          </Link>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Icon name="Check" size={20} className="text-green-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Трек создан!</h1>
              <p className="text-gray-400 text-sm">Аудио будет доступно после подключения API генерации</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-red-500/20 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">{result.title}</h2>
                <div className="flex gap-2 mt-1">
                  {result.genre && <span className="text-xs bg-zinc-800 text-gray-300 px-2 py-1 rounded-full">{result.genre}</span>}
                  {result.mood && <span className="text-xs bg-zinc-800 text-gray-300 px-2 py-1 rounded-full">{result.mood}</span>}
                </div>
              </div>
              <div className="flex items-center gap-2 text-yellow-400 text-sm">
                <Icon name="Clock" size={14} />
                <span>Ожидает аудио</span>
              </div>
            </div>

            {/* Аудио-плеер заглушка */}
            <div className="bg-zinc-800 rounded-lg p-4 flex items-center gap-4 mb-6">
              <button className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-gray-500 cursor-not-allowed">
                <Icon name="Play" size={16} />
              </button>
              <div className="flex-1">
                <div className="h-1.5 bg-zinc-700 rounded-full">
                  <div className="h-1.5 bg-zinc-600 rounded-full w-0" />
                </div>
              </div>
              <span className="text-gray-500 text-sm">0:00</span>
            </div>

            {/* Текст песни */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Текст песни</h3>
              <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">{result.lyrics}</pre>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => { setResult(null); setTitle(''); setPrompt(''); setGenre(''); setMood('') }}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Создать ещё
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className="border-zinc-700 text-gray-300 hover:border-red-500 hover:text-white bg-transparent"
            >
              Все треки
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-red-500/20 px-6 py-4 flex items-center justify-between">
        <Link to="/dashboard">
          <Logo size="sm" />
        </Link>
        <Link to="/dashboard">
          <Button variant="outline" size="sm" className="border-zinc-700 text-gray-300 hover:border-red-500 hover:text-white bg-transparent">
            <Icon name="ArrowLeft" size={14} className="mr-1" />
            Назад
          </Button>
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Создать трек</h1>
          <p className="text-gray-400">Опиши, какую музыку хочешь создать — ИИ сделает остальное</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-white">
              Описание <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="prompt"
              placeholder="Например: грустная баллада о первой любви, акустическая гитара, женский вокал, осенний вечер..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-red-500 min-h-[120px] resize-none"
              required
            />
            <p className="text-zinc-500 text-xs">Чем подробнее опишешь — тем точнее результат</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Название трека</Label>
            <Input
              id="title"
              placeholder="Оставь пустым — сгенерируем автоматически"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Жанр</Label>
              <div className="flex flex-wrap gap-2">
                {GENRES.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGenre(genre === g ? '' : g)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      genre === g
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'border-zinc-700 text-gray-400 hover:border-zinc-500'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Настроение</Label>
              <div className="flex flex-wrap gap-2">
                {MOODS.map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMood(mood === m ? '' : m)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      mood === m
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'border-zinc-700 text-gray-400 hover:border-zinc-500'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold h-12 text-base"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Icon name="Loader2" size={18} className="animate-spin" />
                Создаём трек...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Icon name="Sparkles" size={18} />
                Создать трек
              </span>
            )}
          </Button>
        </form>
      </main>
    </div>
  )
}