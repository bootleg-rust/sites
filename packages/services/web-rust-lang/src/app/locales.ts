import { isServer } from "@ssr-kit/toolbox";

const testClientResources = {
  "en-US": [
    { url: require("../locales/core.ftl") },
    { url: require("./en-US.ftl") },
  ],
  ru: [{ url: require("../locales/core.ftl") }, { url: require("./ru.ftl") }],
};
const testServerResources = {
  "en-US": [
    {
      data: `-security-at-rust-lang-org-anchor = { EMAIL("security@rust-lang.org") }
-rust-security-team-key-href =
        /static/keys/rust-security-team-key.gpg.ascii
-rust-pgp-key-mit-keyserver-href =
        https://pgp.mit.edu/pks/lookup?op=vindex&amp;search=0xEFB9860AE7520DAC"
-wikipedia-rfpolicy-href =
        https://en.wikipedia.org/wiki/RFPolicy

## Security coordinator email addresses and links to their public keys
-security-coordinator-email-anchor =
        <a href="mailto:steve@steveklabnik.com" lang="en-US">Steve Klabnik</a>
-security-coordinator-public-key-href =
        https://pgp.mit.edu/pks/lookup?op=vindex&amp;search=0xDAE717EFE9424541
-backup-security-contact-email-anchor =
        <a href="mailto:pietro@pietroalbini.org" lang="en-US">Pietro Albini</a>
-backup-security-contact-public-key-href =
        https://pgp.mit.edu/pks/lookup?op=vindex&amp;search=0x0490381A6F58BCDA

-internals-rust-lang-org-href =
        https://internals.rust-lang.org/

## Security mailing list links
-rustlang-security-announcements-google-groups-forum-href =
        https://groups.google.com/forum/#!forum/rustlang-security-announcements
-rust-security-announcements-mailing-list-href =
        https://groups.google.com/group/rustlang-security-announcements/subscribe
-rustlang-security-announcements-subscribe-anchor =
        <a href="mailto:rustlang-security-announcements+subscribe@googlegroups.com">rustlang-security-announcements+subscribe@googlegroups.com</a>
-distros-openwall-email-anchor =
        <a href="https://oss-security.openwall.org/wiki/mailing-lists/distros" lang="en-US">distros@openwall</a>
`,
    },
    {
      data: `
## index.hbs
tagline =  A language empowering everyone <br /> to build reliable and efficient software.
get-started = Get Started
homepage-version = Version { $number }


## components/panels/production.hbs
production-title = Rust in production
production-blurb = Hundreds of companies around the world are using Rust in production
        today for fast, low-resource, cross-platform solutions. Software you know
        and love, like <a href="https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/">Firefox</a>,
        <a href="https://blogs.dropbox.com/tech/2016/06/lossless-compression-with-brotli/">Dropbox</a>,
        and <a href="https://blog.cloudflare.com/cloudflare-workers-as-a-serverless-rust-platform/">Cloudflare</a>,
        uses Rust. <strong>From startups to large
        corporations, from embedded devices to scalable web services, Rust is a great fit.</strong>

production-testimonial-npm = My biggest compliment to Rust is that it's boring, and this is an amazing compliment.
production-testimonial-npm-attribution = Chris Dickinson, Engineer at npm, Inc
production-testimonial-npm-alt = npm Logo


production-testimonial-yelp = All the documentation, the tooling, the community is great - you have all the tools to succeed in writing Rust code.
production-testimonial-yelp-attribution = Antonio Verardi, Infrastructure Engineer
production-testimonial-yelp-alt = Yelp Logo


## components/panels/language-values.hbs

language-values-performance = Performance
language-values-performance-blurb = Rust is blazingly fast and memory-efficient: with no runtime or
          garbage collector, it can power performance-critical services, run on
          embedded devices, and easily integrate with other languages.

language-values-reliability = Reliability
language-values-reliability-blurb = Rust’s rich type system and ownership model guarantee memory-safety
          and thread-safety &mdash; enabling you to eliminate many classes of
          bugs at compile-time.

language-values-productivity = Productivity
language-values-productivity-blurb = Rust has great documentation, a friendly compiler with useful error
          messages, and top-notch tooling &mdash; an integrated package manager
          and build tool, smart multi-editor support with auto-completion and
          type inspections, an auto-formatter, and more.

## components/panels/domains.hbs
domains-title = Build it in Rust
domains-blurb = In 2018, the Rust community decided to improve programming experience
        for a few distinct domains (see <a
        href="https://blog.rust-lang.org/2018/03/12/roadmap.html">the 2018
        roadmap</a>). For these, you can find many high-quality crates and some
        awesome guides on how to get started.

domains-cli = Command Line
domains-cli-blurb = Whip up a CLI tool quickly with Rust’s robust ecosystem.
            Rust helps you maintain your app with confidence and distribute it with ease.
domains-cli-alt = terminal

domains-wasm = WebAssembly
domains-wasm-blurb = Use Rust to supercharge your JavaScript, one module at a time.
          Publish to npm, bundle with webpack, and you’re off to the races.
domains-wasm-alt = gear with puzzle piece elements

domains-net = Networking
domains-net-blurb = Predictable performance. Tiny resource footprint. Rock-solid reliability.
            Rust is great for network services.
domains-net-alt = a cloud with nodes

domains-embedded = Embedded
domains-embedded-blurb = Targeting low-resource devices?
            Need low-level control without giving up high-level conveniences?
            Rust has you covered.
domains-embedded-alt = an embedded device chip

## components/panels/get-involved.hbs
get-involved = Get involved

get-involved-read-rust = Read Rust
get-involved-read-rust-blurb = We love documentation! Take a look at the books available online, as well as key blog posts and user guides.
get-involved-read-rust-link = Read the book

get-involved-watch-rust = Watch Rust
get-involved-watch-rust-blurb = The Rust community has a dedicated YouTube channel collecting a huge range of presentations and
        tutorials.
get-involved-watch-rust-link = Watch the Videos

get-involved-contribute = Contribute code
get-involved-contribute-blurb = Rust is truly a community effort, and we welcome contribution from hobbyists and production users, from
      newcomers and seasoned professionals. Come help us make the Rust experience even better!
get-involved-contribute-link = Read Contribution Guide

## components/panels/thanks.hbs

thanks-title = Thanks
thanks-blurb = Rust would not exist without the generous contributions of time, work, and resources from individuals and companies. We are very grateful for the support!

thanks-individuals-header = Individuals
thanks-individuals-blurb = Rust is a community project and is very thankful for the many community contributions it receives.
thanks-individuals-link = See individual contributors

thanks-companies-header = Corporate sponsors
thanks-companies-blurb = The Rust project receives support from companies through the donation of infrastructure.
thanks-companies-link = See sponsors
`,
    },
  ],
  ru: [
    {
      data: `-security-at-rust-lang-org-anchor = { EMAIL("security@rust-lang.org") }
-rust-security-team-key-href =
        /static/keys/rust-security-team-key.gpg.ascii
-rust-pgp-key-mit-keyserver-href =
        https://pgp.mit.edu/pks/lookup?op=vindex&amp;search=0xEFB9860AE7520DAC"
-wikipedia-rfpolicy-href =
        https://en.wikipedia.org/wiki/RFPolicy

## Security coordinator email addresses and links to their public keys
-security-coordinator-email-anchor =
        <a href="mailto:steve@steveklabnik.com" lang="en-US">Steve Klabnik</a>
-security-coordinator-public-key-href =
        https://pgp.mit.edu/pks/lookup?op=vindex&amp;search=0xDAE717EFE9424541
-backup-security-contact-email-anchor =
        <a href="mailto:pietro@pietroalbini.org" lang="en-US">Pietro Albini</a>
-backup-security-contact-public-key-href =
        https://pgp.mit.edu/pks/lookup?op=vindex&amp;search=0x0490381A6F58BCDA

-internals-rust-lang-org-href =
        https://internals.rust-lang.org/

## Security mailing list links
-rustlang-security-announcements-google-groups-forum-href =
        https://groups.google.com/forum/#!forum/rustlang-security-announcements
-rust-security-announcements-mailing-list-href =
        https://groups.google.com/group/rustlang-security-announcements/subscribe
-rustlang-security-announcements-subscribe-anchor =
        <a href="mailto:rustlang-security-announcements+subscribe@googlegroups.com">rustlang-security-announcements+subscribe@googlegroups.com</a>
-distros-openwall-email-anchor =
        <a href="https://oss-security.openwall.org/wiki/mailing-lists/distros" lang="en-US">distros@openwall</a>
`,
    },
    {
      data: `## index.hbs

tagline = Язык, позволяющий каждому <br /> создавать надёжное и эффективное программное обеспечение
get-started = Начало
homepage-version = Версия { $number }

## components/panels/production.hbs

production-title = Промышленное использование Rust
production-blurb = Сотни компаний по всему миру используют Rust в реальных проектах для быстрых кросс-платформенных решений с ограниченными ресурсами. Такие проекты, как <a href="https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/">Firefox</a>, <a href="https://blogs.dropbox.com/tech/2016/06/lossless-compression-with-brotli/">Dropbox</a> и <a href="https://blog.cloudflare.com/cloudflare-workers-as-a-serverless-rust-platform/">Cloudflare</a>, используют Rust. <strong>Rust отлично подходит как для стартапов, так и для больших компаний, как для встраиваемых устройств, так и для масштабируемых web-сервисов.</strong>
production-testimonial-npm = Мой самый большой комплимент Rust &mdash; то, что он скучный, и это потрясающий комплимент.
production-testimonial-npm-attribution = Chris Dickinson, инженер npm, Inc
production-testimonial-npm-alt = Логотип npm
production-testimonial-yelp = Вся документация, инструментарий и сообщество замечательны - у вас есть всё, чтобы преуспеть в написании кода на Rust.
production-testimonial-yelp-attribution = Antonio Verardi, инженер по инфраструктуре
production-testimonial-yelp-alt = Логотип Yelp

## components/panels/language-values.hbs

language-values-performance = Производительность
language-values-performance-blurb = Rust невероятно быстр и эффективен по использованию памяти: без рантайма или сборщика мусора он может обеспечить работу критичных для производительности сервисов, запускаться на встраиваемых устройствах и легко интегрироваться с другими языками.
language-values-reliability = Надёжность
language-values-reliability-blurb = Богатая система типов Rust и модель владения гарантируют потокобезопасность и безопасность памяти, и позволяют устранить множество классов ошибок во время компиляции.
language-values-productivity = Продуктивность
language-values-productivity-blurb = У Rust отличная документация, дружественный компилятор с полезными сообщениями об ошибках и первоклассный инструментарий &mdash; интегрированный пакетный менеджер и инструмент сборки, умная мультиредакторная поддержка с автокомплитом, проверками типов, автоформатированием и многим другим.

## components/panels/domains.hbs

domains-title = Создайте это в Rust
domains-blurb = В 2018 году, сообщество Rust приняло решение расширить присутствие языка для нескольких областей (смотрите <a href="https://blog.rust-lang.org/2018/03/12/roadmap.html">roadmap на 2018 год</a>). Для этого вы можете найти множество высококачественных пакетов и потрясающие руководства о том, как начать.
domains-cli = Командная строка
domains-cli-blurb = Быстро создайте инструмент командной строки с помощью надёжной экосистемы Rust. Rust поможет вам с уверенностью поддерживать ваше приложение и с лёгкостью его распространять.
domains-cli-alt = terminal
domains-wasm = WebAssembly
domains-wasm-blurb = Используйте Rust для перезарядки вашего JavaScript, по одному модулю за раз. Опубликуйте в npm, упакуйте с webpack и вы готовы к соревнованиям.
domains-wasm-alt = шестерёнка в виде элементов пазла
domains-net = Сетевое программирование
domains-net-blurb = Предсказуемая производительность. Крошечные требования к ресурсам. Потрясающая надёжность. Rust отлично подходит для сетевых сервисов.
domains-net-alt = облако с узлами
domains-embedded = Встраиваемые системы
domains-embedded-blurb =
    Ориентируетесь на устройства с малой производительностью?
    Нужен низкоуровневый контроль без отказа от высокоуровневых удобств?
    Rust предоставит это.
domains-embedded-alt = плата встраиваемого устройства

## components/panels/get-involved.hbs

get-involved = Примите участие
get-involved-read-rust = Читай про Rust
get-involved-read-rust-blurb = Мы любим документацию! Посмотрите книги, доступные онлайн, а также ключевые блоги и пользовательские руководства.
get-involved-read-rust-link = Читать книгу
get-involved-watch-rust = Смотрите про Rust
get-involved-watch-rust-blurb = У Rust сообщества есть отдельный канал на YouTube, где собрано огромное количество презентаций и учебных пособий.
get-involved-watch-rust-link = Смотреть видео
get-involved-contribute = Сделать вклад
get-involved-contribute-blurb = Rust - действительно работа сообщества, и мы приветствуем вклад как любителей, так и тех, кто использует его в промышленной разработке, от новичков, до профессионалов. Помогите нам улучшить опыт работы с Rust!
get-involved-contribute-link = Читать руководство

## components/panels/thanks.hbs

thanks-title = Благодарности
thanks-blurb = Rust не существовал бы без щедрого вклада времени, работы и ресурсов от отдельных лиц и компаний. Мы очень благодарны за поддержку!
thanks-individuals-header = Отдельные участники
thanks-individuals-blurb = Rust - это проект сообщества, и он очень благодарен за многочисленные вклады сообщества, которые он получает.
thanks-individuals-link = Посмотреть отдельных участников
thanks-companies-header = Корпоративные спонсоры
thanks-companies-blurb = Проект Rust получает поддержку от компаний через пожертвования для инфраструктуры.
thanks-companies-link = Посмотреть спонсоров
`,
    },
  ],
};

export const localeResources = (isServer
  ? testServerResources
  : testClientResources) as any;
