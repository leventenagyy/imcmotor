import type { ProductImage } from './types'

/**
 * Home page content blocks (editable). The home route composes these; it holds
 * no hardcoded copy of its own. Featured products are referenced by handle.
 */
export const homeContent = {
  hero: {
    eyebrow: '30+ év · Dunakeszi',
    title: 'Olasz motorok, magyar szakértelemmel',
    subtitle:
      'Vespa, Aprilia, Moto Guzzi és Piaggio – értékesítés, szerviz, bérlés és kiegészítők egy helyen.',
    image: {
      src: `${import.meta.env.BASE_URL}images/hero-imc-showroom.jpg`,
      alt: 'IMC Motor szalon olasz robogókkal és motorokkal',
      ratio: '16/9',
    } as ProductImage,
    primaryCta: { label: 'Modellek böngészése', to: '/ujdonsagok' },
    secondaryCta: { label: 'Próbamotort foglalok', to: '/berles' },
  },

  trust: [
    { value: '30+', label: 'év tapasztalat' },
    { value: '4', label: 'olasz márka' },
    { value: 'Teljes körű', label: 'szakszerviz' },
  ],

  brandsTitle: 'Márkáink',
  brandsLead: 'Négy ikonikus olasz márka, egy szalonban.',

  featuredTitle: 'Kiemelt ajánlataink',
  featuredLead: 'Válogatás a szalon kedvenceiből.',
  featuredHandles: [
    'vespa-946-10-anniversario',
    'aprilia-rs-660',
    'moto-guzzi-v100-mandello',
    'vespa-primavera-125',
  ],

  serviceBand: {
    eyebrow: 'Szerviz',
    title: 'Szakszerviz minden olasz márkára',
    body: 'Időszakos karbantartás, műszaki vizsga, diagnosztika és gumiszerelés. Foglalj időpontot online, néhány kattintással – a többit ránk bízhatod.',
    cta: { label: 'Időpontot foglalok', to: '/szerviz/foglalas' },
    image: { src: null, alt: 'IMC Motor szakszerviz műhely', ratio: '4/5' } as ProductImage,
  },

  split: {
    used: {
      eyebrow: 'Használt',
      title: 'Ellenőrzött használt motorok',
      body: 'Beszámított, átvizsgált motorok teljes dokumentációval.',
      cta: { label: 'Használt kínálat', to: '/hasznalt-motorok' },
      image: { src: null, alt: 'Használt motorok', ratio: '3/2' } as ProductImage,
    },
    rental: {
      eyebrow: 'Bérlés & Teszt',
      title: 'Vezesd, mielőtt döntesz',
      body: 'Próbáld ki kedvenc modelled, vagy bérelj egy hétvégére.',
      cta: { label: 'Bérlés / Teszt', to: '/berles' },
      image: { src: null, alt: 'Bérelhető teszt motorok', ratio: '3/2' } as ProductImage,
    },
  },

  newsTitle: 'Hírek a szalonból',
  newsLead: 'Újdonságok, akciók és történetek.',

  newsletter: {
    title: 'Csatlakozz a közösséghez',
    body: 'Iratkozz fel, és elsőként értesülsz az újdonságokról, akciókról és eseményekről.',
  },
}
