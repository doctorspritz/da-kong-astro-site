import { type SiteDataProps } from "./types/configDataTypes";

const siteData: SiteDataProps = {
  name: "Stellar",
  title: "Stellar - a small business theme and landing page crafted with Astro and Tailwind CSS",
  description:
    "Create an amazing website for your small business clients with our beautiful website theme designed using Astro and Tailwind CSS. Perfect for freelancers, developers, startups, and personal use.",
  contact: {
    address1: "1234 Main Street",
    address2: "New York, NY 10001",
    phone: "(123) 456-7890",
    email: "creator@cosmicthemes.com",
  },
  author: {
    name: "Cosmic Themes",
    email: "creator@cosmicthemes.com",
    twitter: "Cosmic_Themes",
  },
  defaultImage: {
    src: "/images/cosmic-themes-logo.jpg",
    alt: "Cosmic Themes logo",
  },
};

export default siteData;

