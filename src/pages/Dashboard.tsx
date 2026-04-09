import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-red-500/20 px-6 py-4 flex items-center justify-between">
        <h1 className="font-orbitron text-xl font-bold">
          Muse<span className="text-red-500">AI</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">
            {user?.name || user?.email}
          </span>
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

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">
            Привет, {user?.name || 'музыкант'} 👋
          </h2>
          <p className="text-gray-400">Что создаём сегодня?</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <button className="bg-zinc-900 border border-red-500/20 hover:border-red-500/60 rounded-xl p-6 text-left transition-all duration-200 group">
            <div className="text-3xl mb-3">🎤</div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-red-400 transition-colors">Написать текст</h3>
            <p className="text-gray-400 text-sm">ИИ создаст текст песни по описанию</p>
          </button>

          <button className="bg-zinc-900 border border-red-500/20 hover:border-red-500/60 rounded-xl p-6 text-left transition-all duration-200 group">
            <div className="text-3xl mb-3">🎵</div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-red-400 transition-colors">Создать трек</h3>
            <p className="text-gray-400 text-sm">Генерация музыки в любом жанре</p>
          </button>

          <button className="bg-zinc-900 border border-red-500/20 hover:border-red-500/60 rounded-xl p-6 text-left transition-all duration-200 group">
            <div className="text-3xl mb-3">🎬</div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-red-400 transition-colors">Снять клип</h3>
            <p className="text-gray-400 text-sm">Автоматический видеоклип под трек</p>
          </button>
        </div>

        {/* Empty state */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <Icon name="Music" size={48} className="text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Твои проекты появятся здесь</h3>
          <p className="text-gray-500 mb-6">Создай первый трек — это займёт меньше 5 минут</p>
          <Button className="bg-red-500 hover:bg-red-600 text-white">
            Начать создавать
          </Button>
        </div>
      </main>
    </div>
  )
}
