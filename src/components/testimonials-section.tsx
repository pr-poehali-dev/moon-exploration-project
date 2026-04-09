import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Алексей Морозов",
    role: "Независимый музыкант, 120k подписчиков",
    avatar: "/cybersecurity-expert-man.jpg",
    content:
      "За месяц выпустил 8 треков с клипами. MuseAI делает за час то, на что раньше уходила неделя. Мой голос уже купили 200+ раз в маркетплейсе.",
  },
  {
    name: "Елена Соколова",
    role: "Автор песен, лейбл SoundWave Records",
    avatar: "/professional-woman-scientist.png",
    content:
      "Наконец-то инструмент, который понимает музыку. Тексты получаются живые и эмоциональные. Авторские права оформляются автоматически — это огромный плюс.",
  },
  {
    name: "Дмитрий Ли",
    role: "Продюсер, 50+ релизов в Spotify",
    avatar: "/asian-woman-tech-developer.jpg",
    content:
      "MuseAI изменил мой рабочий процесс полностью. Генерирую демо за минуты, клиенты в восторге. Качество мастеринга сравнимо со студией.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-card-foreground mb-4 font-sans">Музыканты уже создают</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Реальные истории от артистов, которые используют MuseAI для создания музыки
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-6">
                <p className="text-card-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
