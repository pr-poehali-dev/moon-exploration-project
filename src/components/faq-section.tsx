import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Кому принадлежат права на созданную музыку?",
      answer:
        "Все права принадлежат вам. MuseAI автоматически регистрирует авторское право на каждое созданное произведение. Вы полностью владеете своей музыкой, текстами и видеоклипами.",
    },
    {
      question: "Как работает маркетплейс голосов?",
      answer:
        "Вы записываете образец своего голоса, наш ИИ создаёт цифровую модель. Другие пользователи могут арендовать ваш голос для своих треков — вы получаете роялти за каждое использование.",
    },
    {
      question: "Можно ли публиковать треки на стриминговых платформах?",
      answer:
        "Да, мы интегрированы с Spotify, Apple Music, YouTube Music и другими платформами. Публикация происходит в один клик прямо из MuseAI.",
    },
    {
      question: "Насколько качественные треки генерирует ИИ?",
      answer:
        "Треки проходят профессиональный AI-мастеринг и соответствуют стандартам стриминговых платформ. Многие пользователи не отличают их от студийных записей.",
    },
    {
      question: "Нужны ли музыкальные знания для использования платформы?",
      answer:
        "Нет. MuseAI разработан для всех — от новичков до профессионалов. Просто опишите, что хочешь создать, и ИИ сделает всё остальное. Технические детали опциональны.",
    },
    {
      question: "Сколько стоит использование MuseAI?",
      answer:
        "Есть бесплатный тариф с базовыми функциями. Платные тарифы открывают неограниченную генерацию, маркетплейс голосов и автоматическую публикацию. Подробнее — в разделе тарифов.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Частые вопросы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Ответы на популярные вопросы о создании музыки, правах и маркетплейсе голосов.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
