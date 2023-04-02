// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const timeline = [
  {
    id: "0",
    avatar:
      "https://pbs.twimg.com/profile_images/1524670334737264640/fwhN6as0_400x400.jpg",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
    
    (gzipped size went from 16.6 KB down to 2.7 KB!!)
    
    * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "1",
    avatar:
      "https://pbs.twimg.com/profile_images/1613612257015128065/oA0Is67J_400x400.jpg",
    username: "midudev",
    message: "Wow, devter está funcionando y vivo 🦉",
    name: "Miguel Ángel Durán",
  },
  {
    id: "2",
    username: "detterN",
    name: "Detter",
    avatar:
      "https://pbs.twimg.com/profile_images/1311513330582986755/JLpW-Qkg_400x400.jpg",
    message: `Abro paraguas: Paraguas
    
    Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
]

export default function handler(req, res) {
  res.status(200).json(timeline)
}
