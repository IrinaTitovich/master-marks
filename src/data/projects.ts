import project350Image1 from "@/assets/ready-project-1-story-number-1.jpg";
import project350Image2 from "@/assets/ready-project-1-story-number-1.2.jpg";
import project333Image1 from "@/assets/ready-project-1-story-number-2.jpg";
import project333Image2 from "@/assets/ready-project-1-story-number-2.2.jpg";
import project245Image1 from "@/assets/ready-project-2-story-number-1.jpg";
import project245Image2 from "@/assets/ready-project-2-story-number-1.2.jpg";
import project245Image3 from "@/assets/ready-project-2-story-number-1.3.jpg";
import project245Image4 from "@/assets/ready-project-2-story-number-1.4.jpg";

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
  {
    id: "project-245",
    title: "Проект двухэтажного дома № 245",
    category: "two-story",
    projectNumber: "245",
    image: project245Image1,
    images: [project245Image1, project245Image2, project245Image3, project245Image4],
    area: "88,8 м² (1 этаж) + 89,3 м² (2 этаж) + 206,6 м² (цокольный этаж) + 48,0 м² (терраса) + 74,4 м² (гараж с тех.помещениями)",
    description: "Проект №245. Дом двухэтажный с 4 спальнями, цокольным этажом, 2 санузлами, гаражом и террасой. Наружные стены – комбинированные с облицовкой керамическим кирпичом. Перекрытия межэтажные – плиты железобетонные многопустотные. Кровля – сложная многоскатная с покрытием битумной черепицей.",
    details: "Площадь 1 этажа – 88,8кв.м, 2 этажа – 89,3кв.м, цокольного этажа –206,6кв.м., террасы – 48,0кв.м, гаража с тех.помещениями – 74,4кв.м.",
  },
];
