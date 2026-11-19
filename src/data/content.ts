import type { PublicMoment } from '../api/content'

export const moments: PublicMoment[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1800&q=84',
    alt: 'A congregation worshipping under warm amber stage lights',
    label: 'Worship that is alive',
    align: 'center',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1600&q=84',
    alt: 'A vibrant worship gathering with hands raised',
    label: 'A house of encounter',
    align: 'center',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1579975096649-e773152b04cb?auto=format&fit=crop&w=1600&q=84',
    alt: 'A church congregation gathered around an illuminated cross',
    label: 'A family on mission',
    align: 'center',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1508829040592-72f179f8a73f?auto=format&fit=crop&w=1600&q=84',
    alt: 'Young people worshipping in a packed auditorium',
    label: 'A generation carrying light',
    align: 'center',
  },
]

const illustrativeImages = new Set(moments.map(({ image }) => image.split('?')[0]))

export function isIllustrativeMoment(moment: PublicMoment) {
  return illustrativeImages.has(moment.image.split('?')[0])
}

export const formationPillars = [
  {
    title: 'The Word',
    copy: 'Clear teaching that builds conviction, shapes character, and gives language to faith.',
  },
  {
    title: 'Worship',
    copy: 'More than a song — a life fully yielded to God and awake to His presence.',
  },
  {
    title: 'Community',
    copy: 'A spiritual family where students are known, strengthened, and sent to shine.',
  },
]
