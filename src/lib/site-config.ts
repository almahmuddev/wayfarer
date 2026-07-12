export const siteConfig = {
  name: "Wayfarer",
  tagline: "Discover Guided Outdoor Adventures",
  description:
    "Wayfarer connects travelers with guided hiking, camping, water, cultural, wildlife, and photography experiences led by verified local hosts.",
  supportEmail: "hello@wayfarer-travel.com",
  supportPhone: "+880 1XXX-XXXXXX",
};

// Visible to everyone
export const publicNavLinks = [
  { label: "Explore", href: "/experiences" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Extra links shown only once a user is signed in
export const authedNavLinks = [
  { label: "Add Experience", href: "/items/add" },
  { label: "My Listings", href: "/items/manage" },
];

export const categories = [
  {
    label: "Hiking",
    slug: "Hiking",
    icon: "Mountain",
    blurb: "Trails through hills and forests",
  },
  {
    label: "Camping",
    slug: "Camping",
    icon: "Tent",
    blurb: "Nights under open sky",
  },
  {
    label: "Water Adventure",
    slug: "Water Adventure",
    icon: "Waves",
    blurb: "Kayaking, rafting, and rivers",
  },
  {
    label: "Cultural",
    slug: "Cultural",
    icon: "Landmark",
    blurb: "Local life and traditions",
  },
  {
    label: "Wildlife",
    slug: "Wildlife",
    icon: "PawPrint",
    blurb: "Forests, rivers, and rare species",
  },
  {
    label: "Photography",
    slug: "Photography",
    icon: "Camera",
    blurb: "Golden hours, worth the hike",
  },
] as const;

// TODO: replace with real social profiles before final submission
export const socialLinks = [
  { label: "Instagram", href: "#", icon: "Instagram" },
  { label: "Facebook", href: "#", icon: "Facebook" },
  { label: "X", href: "#", icon: "Twitter" },
  { label: "LinkedIn", href: "#", icon: "Linkedin" },
];

export const footerLinkGroups = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Explore",
    links: categories.slice(0, 4).map((c) => ({
      label: c.label,
      href: `/experiences?category=${encodeURIComponent(c.slug)}`,
    })),
  },
  {
    heading: "Support",
    links: [
      { label: "Help / FAQ", href: "/help" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];
