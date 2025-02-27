// thank you gophercises - https://gophercises.com/ for the typing
// https://github.com/wennerryle/gophercises/blob/choose-your-adventure/parser.go

export type StoryPaths = "greetings" | "yandex" | "technologies" | "author" | "about"

export interface StoryOption {
  text: string,
  arc: StoryPaths,
}

export interface StoryPart {
  story: string[],
  options: StoryOption[]
}

export type StoryArc = Record<StoryPaths, StoryPart>

const toStart = { text: "Начать всё заново", arc: "greetings" } as const;
const toTechnologies = { text: "На каких технологиях сделано это приложение?", arc: "technologies" } as const;

const link = (a: string, desc: string) => /*html*/`<a style="color: blue" href="${a}" target="_blank">${desc}</a>`

export const story: StoryArc = {
  greetings: {
    story: ["Привет! Добро пожаловать в это приложение!<br>Что желаешь узнать?"],
    options: [
      { text: `Почему существует это приложение?`, arc: "yandex" },
      { text: "Расскажи об авторе", arc: "author" },
      { text: "Об приложении", arc: "about" },
    ],
  },
  yandex: {
    story: [
      /*html*/`Это приложение существует из-за того, что
      ${link("https://yandexmusic.userecho.ru/communities/45/topics/9833-vernut-skrobling-last-fm", "Яндекс отключил скробблинг")}
      в декабре 2024 года в своем новом дизайне приложения.`,
      "Также, автор пытался добавить поддержку нового дизайна в WebScrobbler, но его ещё не приняли.",
    ],
    options: [toStart],
  },
  technologies: {
    story: [
      "Рад, что ты решил(а) поинтересоваться!",
      "Расширение написано на следующих технологиях:",
      /*html*/`<b>${link("https://wxt.dev/", "WXT")}</b> - фреймворк для расширений, построен на Vite, и реализует кроссбраузерную работу расширения.`,
      /*html*/`<b>${link("https://daisyui.com/", "daisyUI")}</b> - крутой набор готовых css-компонентов, например - этот чат, шапка, и навигация`,
      /*html*/`<b>${link("https://tailwindcss.com/", "TailwindCSS")}</b> - атомик-css фреймворк`,
      /*html*/`<b>${link("https://svelte.dev/", "Svelte")}</b> - UI фреймворк, максимально простой, компилирующийся и быстрый`,
      /*html*/`<b>${link("https://www.movingicons.dev/", "Moving Icons")}</b> x <b>lucide</b> - анимированные иконки, адаптированные под Svelte`
    ],
    options: [toStart],
  },
  author: {
    story: [
      /*html*/`Узнать об авторе можно на его<br>${link("https://github.com/wennerryle", "странице GitHub")}`,
      /*html*/`Также вы можете задонатить на замену
      ${link("https://boosty.to/wennerryle/single-payment/donation/685082/target?share=target_link", "сгоревшего монитора автору 💸")}`,
      /*html*/`А ещё автор в поисках стабильной работы.. 🍕`
    ],
    options: [toStart]
  },
  about: {
    story: [
      "Скробблер для Last.fm (в будущем будет добавлена поддержка других платформ)",
      "semver v0.2.0.pre-alpha",
      "Следите за изменениями в нашем<br>" + link("https://t.me/yascrobbler", "телеграм канале"),
    ],
    options: [toTechnologies, toStart]
  }
};