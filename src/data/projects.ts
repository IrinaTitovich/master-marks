import project350Image1 from "@/assets/ready-project-1-story-number-1.jpg";
import project350Image2 from "@/assets/ready-project-1-story-number-1.2.jpg";
import project333Image1 from "@/assets/ready-project-1-story-number-2.jpg";
import project333Image2 from "@/assets/ready-project-1-story-number-2.2.jpg";

export interface Project {
  id: string;
  title: string;
  category: string;
  image?: string;
  images?: string[];
  area?: string;
  description?: string;
  projectNumber?: string;
  details?: string;
}

export const projects: Project[] = [
  {
    id: "project-350",
    title: "Проект одноэтажного дома № 350",
    category: "single-story",
    projectNumber: "350",
    image: project350Image1,
    images: [project350Image1, project350Image2],
    area: "99,4 м² (1 этаж) + 23,4 м² (терраса)",
    description: "Проект №350. Дом одноэтажный с 3 спальнями, 1 санузлом и террасой. Площадь 1 этажа – 99,4 кв.м, террасы – 23,4 кв.м. Наружные стены – блоки газосиликатные с последующей отделкой по системе утепления. Перекрытия – деревянные балки. Кровля – разноуровневая с покрытием металлочерепицей.",
    details: "",
  },
  {
    id: "project-333",
    title: "Проект одноэтажного дома № 333",
    category: "single-story",
    projectNumber: "333",
    image: project333Image1,
    images: [project333Image1, project333Image2],
    area: "130,7 м² (1 этаж) + 27,5 м² (терраса)",
    description: "Проект №333. Дом одноэтажный с 3 спальнями, 2 санузлами и террасой. Площадь 1 этажа – 130,7 кв.м, террасы – 27,5 кв.м. Наружные стены – блоки газосиликатные с последующей отделкой. Перекрытия – деревянные балки. Кровля – вальмовая с покрытием стальными листами, закрепленными в фальц.",
    details: "",
  },
];
