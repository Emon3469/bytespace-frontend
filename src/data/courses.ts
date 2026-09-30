export type Course = {
  id: string;
  title: string;
  author: string;
  image: string;
  imageAlt: string;
  lessons: number;
  duration: string;
  comments: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  price: number;
  enrolledExtra: number;
};

const base = {
  author: "purepearl studio",
  lessons: 17,
  duration: "2 hours 16 mins",
  comments: 59,
  level: "Beginner",
  rating: 4.5,
  price: 25,
  enrolledExtra: 26,
} as const;

export const featuredCourses: Course[] = [
  {
    ...base,
    id: "learn-figma-from-basic",
    title: "Learn Figma from Basic",
    image: "/images/courses/figma.png",
    imageAlt: "Designer sketching wireframes on paper next to a laptop and sticky notes",
  },
  {
    ...base,
    id: "build-digital-asset",
    title: "Build Digital Asset",
    image: "/images/courses/digital-asset.png",
    imageAlt: "Close-up of embossed app and media icons on a grey surface",
  },
  {
    ...base,
    id: "the-power-of-big-data",
    title: "the Power of Big Data",
    image: "/images/courses/big-data.png",
    imageAlt: "Analytics dashboard with blue histograms displayed on a laptop screen",
  },
  {
    ...base,
    id: "balancing-productivity-and-self-care",
    title: "Balancing Productivity and Self-Care",
    image: "/images/courses/productivity.png",
    imageAlt: "Tidy desk with an iMac showing the words “Do More”",
  },
  {
    ...base,
    id: "mastering-money-management",
    title: "Mastering Money Management",
    image: "/images/courses/money.png",
    imageAlt: "Printed line chart with a green trend line",
  },
  {
    ...base,
    id: "from-idea-to-startup-success",
    title: "From Idea to Startup Success",
    image: "/images/courses/startup.png",
    imageAlt: "Team meeting in front of a wall of colourful sticky notes",
  },
];

export const courseCategories: string[][] = [
  [
    "Featured",
    "Music",
    "Drawing & Painting",
    "Marketing",
    "Animation",
    "Social Media",
    "UI/UX Design",
    "Creative Marketing",
  ],
  ["Digital Illustration", "Film & Video", "Crafts", "Freelance & Entrepreneurship", "Graphic Design", "Photography"],
  ["Productivity", "Web Development", "Data Science", "Cooking"],
];

export const learningPaths = [
  { label: "Design", icon: "/images/categories/design.svg" },
  { label: "Development", icon: "/images/categories/development.svg" },
  { label: "IT & Software", icon: "/images/categories/it.svg" },
  { label: "Business", icon: "/images/categories/business.svg" },
  { label: "Marketing", icon: "/images/categories/marketing.svg" },
  { label: "Photography", icon: "/images/categories/photography.svg" },
];

export const learnerAvatars = [1, 2, 3, 4].map((n) => `/images/avatars/learner-${n}.png`);
export const studentAvatars = [1, 2, 3, 4, 5, 6, 7].map((n) => `/images/avatars/student-${n}.png`);
