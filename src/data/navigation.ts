export interface NavLink {
  label: string;
  href: string;
}

// Logged-out navbar: minimum 3 routes required by spec (we ship 4).
export const guestNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/experiences" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Logged-in navbar: minimum 5 routes required by spec (we ship 6).
export const authNavLinks: NavLink[] = [
  ...guestNavLinks,
  { label: "Add Experience", href: "/items/add" },
  { label: "Manage Listings", href: "/items/manage" },
];
