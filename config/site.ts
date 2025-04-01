export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Calculateur de Salaire",
  description: "Convertissez facilement votre salaire brut en salaire net avec notre calculateur simple.",
  navItems: [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "À propos",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "À propos",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/brutonet",
    twitter: "https://twitter.com/brutonet",
    docs: "https://brutonet.fr",
  },
};
