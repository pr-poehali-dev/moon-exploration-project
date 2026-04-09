import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Генерация текстов песен",
    description: "ИИ создаёт профессиональные тексты на любую тему, жанр и настроение за секунды. Поддержка русского, английского и других языков.",
    icon: "mic",
    badge: "Тексты",
  },
  {
    title: "Создание музыки",
    description: "Генерируй треки в любом жанре — поп, хип-хоп, электронная, рок. Полный контроль над инструментами, темпом и аранжировкой.",
    icon: "music",
    badge: "Музыка",
  },
  {
    title: "Видеоклипы с ИИ",
    description: "Автоматическое создание видеоклипов под твою музыку. Визуальные эффекты, монтаж и анимация — всё генерируется автоматически.",
    icon: "video",
    badge: "Видео",
  },
  {
    title: "Маркетплейс голосов",
    description: "Продавай и покупай уникальные AI-голоса. Монетизируй свой голос, зарабатывай роялти каждый раз, когда его используют.",
    icon: "store",
    badge: "Маркетплейс",
  },
  {
    title: "Авторские права",
    description: "Каждое созданное произведение автоматически защищается авторским правом. Полная юридическая защита вашего творчества.",
    icon: "shield",
    badge: "Защита",
  },
  {
    title: "Мастеринг и микс",
    description: "Профессиональное качество звука с ИИ-мастерингом. Твои треки звучат как продукция топовых студий звукозаписи.",
    icon: "equalizer",
    badge: "Качество",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Всё для создания музыки</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            От идеи до готового клипа с авторским правом — один инструмент для полного музыкального производства
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">
                    {feature.icon === "mic" && "🎤"}
                    {feature.icon === "music" && "🎵"}
                    {feature.icon === "video" && "🎬"}
                    {feature.icon === "store" && "🛒"}
                    {feature.icon === "shield" && "🛡️"}
                    {feature.icon === "equalizer" && "🎚️"}
                  </span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
