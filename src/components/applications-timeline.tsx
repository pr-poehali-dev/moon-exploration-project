import { Timeline } from "@/components/ui/timeline"

export function ApplicationsTimeline() {
  const data = [
    {
      title: "Пишешь текст",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Опиши тему, настроение и жанр — РифмоСинтез мгновенно создаёт профессиональный текст песни.
            Редактируй, дорабатывай и делай его по-настоящему своим.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Любой жанр: поп, рэп, рок, джаз, электронная
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Поддержка 30+ языков
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Умные рифмы и ритм в соответствии со стилем
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Создаёшь музыку",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            ИИ генерирует полноценный трек под твой текст — с мелодией, инструментами и вокалом.
            Выбирай голос из маркетплейса или используй свой.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Тысячи уникальных AI-голосов в маркетплейсе
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Профессиональный мастеринг в один клик
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Полный контроль над темпом, тональностью и аранжировкой
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Публикуешь шедевр",
      content: (
        <div>
          <p className="text-white text-sm md:text-base font-normal mb-6 leading-relaxed">
            Готовый видеоклип с автоматически сгенерированной визуальной частью. Публикуй на платформах
            с подтверждённым авторским правом и получай роялти.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Автоматическая регистрация авторских прав
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Прямая публикация в Spotify, YouTube, Apple Music
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Монетизация голоса в маркетплейсе
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section id="marketplace" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">Как это работает</h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Три шага от идеи до музыкального шедевра с авторским правом — быстро, профессионально, доступно каждому.
          </p>
        </div>

        <div className="relative">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  )
}