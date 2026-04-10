import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

interface Track {
  id: number
  title: string
  prompt: string
  genre: string | null
  mood: string | null
  lyrics: string | null
  audio_url: string | null
  status: string
  created_at: string
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tracks, setTracks] = useState<Track[]>([])
  const [loadingTracks, setLoadingTracks] = useState(true)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  useEffect(() => {
    api.listTracks().then(({ ok, data }) => {
      if (ok) setTracks(data.tracks)
      setLoadingTracks(false)
    })
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-red-500/20 px-6 py-4 flex items-center justify-between">
        <h1 className="font-orbitron text-xl font-bold">РифмоСинтез</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{user?.name || user?.email}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-zinc-700 text-gray-300 hover:border-red-500 hover:text-white bg-transparent"
          >
            Выйти
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-1">Привет, {user?.name || 'музыкант'} 👋</h2>
            <p className="text-gray-400">Что создаём сегодня?</p>
          </div>
          <Link to="/dashboard/create">
            <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold">
              <Icon name="Plus" size={16} className="mr-2" />
              Новый трек
            </Button>
          </Link>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to="/dashboard/create" className="bg-zinc-900 border border-red-500/20 hover:border-red-500/60 rounded-xl p-6 text-left transition-all duration-200 group block">
            <div className="text-3xl mb-3">🎤</div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-red-400 transition-colors">Написать текст</h3>
            <p className="text-gray-400 text-sm">ИИ создаст текст песни по описанию</p>
          </Link>

          <Link to="/dashboard/create" className="bg-zinc-900 border border-red-500/20 hover:border-red-500/60 rounded-xl p-6 text-left transition-all duration-200 group block">
            <div className="text-3xl mb-3">🎵</div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-red-400 transition-colors">Создать трек</h3>
            <p className="text-gray-400 text-sm">Генерация музыки в любом жанре</p>
          </Link>

          <button className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-left opacity-50 cursor-not-allowed">
            <div className="text-3xl mb-3">🎬</div>
            <h3 className="font-semibold text-lg mb-1">Снять клип</h3>
            <p className="text-gray-400 text-sm">Скоро будет доступно</p>
          </button>
        </div>

        {/* Tracks history */}
        <div>
          <h3 className="text-xl font-bold mb-4">Мои треки</h3>

          {loadingTracks ? (
            <div className="flex items-center gap-2 text-gray-400 py-8">
              <Icon name="Loader2" size={18} className="animate-spin" />
              <span>Загружаем треки...</span>
            </div>
          ) : tracks.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
              <Icon name="Music" size={48} className="text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Треков пока нет</h3>
              <p className="text-gray-500 mb-6">Создай первый трек — это займёт меньше 5 минут</p>
              <Link to="/dashboard/create">
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Создать трек
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {tracks.map(track => (
                <div key={track.id} className="bg-zinc-900 border border-zinc-800 hover:border-red-500/30 rounded-xl transition-all">
                  <div
                    className="flex items-center gap-4 p-4 cursor-pointer"
                    onClick={() => setExpandedId(expandedId === track.id ? null : track.id)}
                  >
                    {/* Play button */}
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0">
                      {track.audio_url ? (
                        <Icon name="Play" size={16} className="text-white ml-0.5" />
                      ) : (
                        <Icon name="Music" size={16} className="text-zinc-500" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{track.title}</p>
                      <p className="text-gray-500 text-sm truncate">{track.prompt}</p>
                    </div>

                    {/* Tags */}
                    <div className="hidden md:flex items-center gap-2">
                      {track.genre && (
                        <span className="text-xs bg-zinc-800 text-gray-400 px-2 py-1 rounded-full">{track.genre}</span>
                      )}
                      {track.mood && (
                        <span className="text-xs bg-zinc-800 text-gray-400 px-2 py-1 rounded-full">{track.mood}</span>
                      )}
                    </div>

                    {/* Date + expand */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-gray-500 text-xs hidden sm:block">
                        {new Date(track.created_at).toLocaleDateString('ru-RU')}
                      </span>
                      <Icon
                        name={expandedId === track.id ? 'ChevronUp' : 'ChevronDown'}
                        size={16}
                        className="text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Expanded lyrics */}
                  {expandedId === track.id && track.lyrics && (
                    <div className="px-4 pb-4 border-t border-zinc-800 pt-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Текст песни</p>
                      <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">{track.lyrics}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
