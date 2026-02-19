export type HomeQuickCard = {
  href: string;
  titleKey: string;
  descriptionKey: string;
};

export const homeQuickCards: HomeQuickCard[] = [
  {
    href: "/accommodation",
    titleKey: "home.quickCards.accommodation.title",
    descriptionKey: "home.quickCards.accommodation.description",
  },
  {
    href: "/dining",
    titleKey: "home.quickCards.dining.title",
    descriptionKey: "home.quickCards.dining.description",
  },
  {
    href: "/experiences",
    titleKey: "home.quickCards.experiences.title",
    descriptionKey: "home.quickCards.experiences.description",
  },
  {
    href: "/wellness",
    titleKey: "home.quickCards.wellness.title",
    descriptionKey: "home.quickCards.wellness.description",
  },
  {
    href: "/offers",
    titleKey: "home.quickCards.offers.title",
    descriptionKey: "home.quickCards.offers.description",
  },
];
