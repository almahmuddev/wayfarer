import { Mountain, Tent, Waves, Landmark, PawPrint, Camera, type LucideIcon } from "lucide-react";

export interface CategoryInfo {
  name: string;
  icon: LucideIcon;
  description: string;
}

export const categories: CategoryInfo[] = [
  {
    name: "Hiking",
    icon: Mountain,
    description: "Ridge trails and summit routes for every pace.",
  },
  {
    name: "Camping",
    icon: Tent,
    description: "Riverside and forest campsites, gear included.",
  },
  {
    name: "Water Adventure",
    icon: Waves,
    description: "Kayaking, rafting, and mangrove paddling.",
  },
  {
    name: "Cultural",
    icon: Landmark,
    description: "Heritage walks and local craft traditions.",
  },
  {
    name: "Wildlife",
    icon: PawPrint,
    description: "Guided tracking with conservation-minded hosts.",
  },
  {
    name: "Photography",
    icon: Camera,
    description: "Golden-hour treks built around the shot.",
  },
];
