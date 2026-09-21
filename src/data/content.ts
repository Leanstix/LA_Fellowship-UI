export type Moment = {
  image: string
  alt: string
  label: string
  align?: 'center' | 'top' | 'bottom'
}

export const moments: Moment[] = [
  {
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1800&q=84',
    alt: 'A congregation worshipping under warm amber stage lights',
    label: 'Worship that is alive',
    align: 'center',
  },
  {
    image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1600&q=84',
    alt: 'A vibrant worship gathering with hands raised',
    label: 'A house of encounter',
    align: 'center',
  },
  {
    image: 'https://images.unsplash.com/photo-1579975096649-e773152b04cb?auto=format&fit=crop&w=1600&q=84',
    alt: 'A church congregation gathered around an illuminated cross',
    label: 'A family on mission',
    align: 'center',
  },
  {
    image: 'https://images.unsplash.com/photo-1508829040592-72f179f8a73f?auto=format&fit=crop&w=1600&q=84',
    alt: 'Young people worshipping in a packed auditorium',
    label: 'A generation carrying light',
    align: 'center',
  },
]

export const formationPillars = [
  {
    number: '01',
    title: 'The Word',
    copy: 'Clear teaching that builds conviction, shapes character, and gives language to faith.',
  },
  {
    number: '02',
    title: 'Worship',
    copy: 'More than a song — a life fully yielded to God and awake to His presence.',
  },
  {
    number: '03',
    title: 'Community',
    copy: 'A spiritual family where students are known, strengthened, and sent to shine.',
  },
]
