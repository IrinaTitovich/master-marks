// Одноэтажные дома
import project350Image1 from "@/assets/projects/single-story/project-350/project-350-1.jpg";
import project350Image2 from "@/assets/projects/single-story/project-350/project-350-2.jpg";
import project333Image1 from "@/assets/projects/single-story/project-333/project-333-1.jpg";
import project333Image2 from "@/assets/projects/single-story/project-333/project-333-2.jpg";
import project478Image1 from "@/assets/projects/single-story/project-478/project-478-1.jpg";
import project478Image2 from "@/assets/projects/single-story/project-478/project-478-2.jpg";

// Двухэтажные дома
import project244Image1 from "@/assets/projects/two-story/project-244/project-244-1.jpg";
import project244Image2 from "@/assets/projects/two-story/project-244/project-244-2.jpg";
import project244Image3 from "@/assets/projects/two-story/project-244/project-244-3.jpg";
import project244Image4 from "@/assets/projects/two-story/project-244/project-244-4.jpg";
import project245Image1 from "@/assets/projects/two-story/project-245/project-245-1.jpg";
import project245Image2 from "@/assets/projects/two-story/project-245/project-245-2.jpg";
import project245Image3 from "@/assets/projects/two-story/project-245/project-245-3.jpg";
import project245Image4 from "@/assets/projects/two-story/project-245/project-245-4.jpg";
import project251Image1 from "@/assets/projects/two-story/project-251/project-251-1.jpg";
import project251Image2 from "@/assets/projects/two-story/project-251/project-251-2.jpg";
import project251Image3 from "@/assets/projects/two-story/project-251/project-251-3.jpg";
import project321Image1 from "@/assets/projects/two-story/project-321/project-321-1.jpg";
import project321Image2 from "@/assets/projects/two-story/project-321/project-321-2.jpg";
import project321Image3 from "@/assets/projects/two-story/project-321/project-321-3.jpg";
import project321Image4 from "@/assets/projects/two-story/project-321/project-321-4.jpg";
import project501Image1 from "@/assets/projects/two-story/project-501/project-501-1.jpg";
import project501Image2 from "@/assets/projects/two-story/project-501/project-501-2.jpg";
import project501Image3 from "@/assets/projects/two-story/project-501/project-501-3.jpg";
import project496Image1 from "@/assets/projects/two-story/project-496/project-496-1.jpg";
import project496Image2 from "@/assets/projects/two-story/project-496/project-496-2.jpg";
import project496Image3 from "@/assets/projects/two-story/project-496/project-496-3.jpg";
// Мансардные дома
import project483Image1 from "@/assets/projects/mansard/project-483/project-483-1.jpg";
import project483Image2 from "@/assets/projects/mansard/project-483/project-483-2.jpg";
import project483Image3 from "@/assets/projects/mansard/project-483/project-483-3.jpg";
import project282Image1 from "@/assets/projects/mansard/project-282/project-282-1.jpg";
import project282Image2 from "@/assets/projects/mansard/project-282/project-282-2.jpg";
import project282Image3 from "@/assets/projects/mansard/project-282/project-282-3.jpg";
import project282Image4 from "@/assets/projects/mansard/project-282/project-282-4.jpg";
import project282Image5 from "@/assets/projects/mansard/project-282/project-282-5.jpg";
import project307Image1 from "@/assets/projects/mansard/project-307/project-307-1.jpg";
import project307Image2 from "@/assets/projects/mansard/project-307/project-307-2.jpg";
import project307Image3 from "@/assets/projects/mansard/project-307/project-307-3.jpg";
import project307Image4 from "@/assets/projects/mansard/project-307/project-307-4.jpg";

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
    description:
      "Проект №350. Дом одноэтажный с 3 спальнями, 1 санузлом и террасой. Площадь 1 этажа – 99,4 кв.м, террасы – 23,4 кв.м. Наружные стены – блоки газосиликатные с последующей отделкой по системе утепления. Перекрытия – деревянные балки. Кровля – разноуровневая с покрытием металлочерепицей.",
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
    description:
      "Проект №333. Дом одноэтажный с 3 спальнями, 2 санузлами и террасой. Площадь 1 этажа – 130,7 кв.м, террасы – 27,5 кв.м. Наружные стены – блоки газосиликатные с последующей отделкой. Перекрытия – деревянные балки. Кровля – вальмовая с покрытием стальными листами, закрепленными в фальц.",
    details: "",
  },
  {
    id: "project-478",
    title: "Проект одноэтажного дома № 478",
    category: "single-story",
    projectNumber: "478",
    image: project478Image1,
    images: [project478Image1, project478Image2],
    area: "101,7 м² (1 этаж) + 24,4 м² (терраса) + 27,9 м² (навес) + 14,7 м² (подвал)",
    description:
      "Проект №478. Дом одноэтажный с двумя спальнями, двумя санузлами, террасой, навесом и подвалом. Наружные стены – блоки газосиликатные с последующей отделкой; перекрытия – ж/б плиты, монолит; кровля – скатная сложная с покрытием из металлочерепицы.",
    details:
      "Площадь 1 этажа – 101,7 кв.м, террасы – 24,4 кв.м, навеса – 27,9 кв.м, подвала – 14,7 кв.м.",
  },
  {
    id: "project-244",
    title: "Проект двухэтажного дома № 244",
    category: "two-story",
    projectNumber: "244",
    image: project244Image1,
    images: [
      project244Image1,
      project244Image2,
      project244Image3,
      project244Image4,
    ],
    area: "168,8 м² (1 этаж) + 154,4 м² (2 этаж) + 189,8 м² (цокольный этаж с гаражом) + 123,1 м² (балконы и террасы)",
    description:
      "Проект №244. Дом двухэтажный с 5 спальнями, цокольным этажом, кабинетом, 5 санузлами, балконами, террасами и гаражом. Наружные стены – блок керамзитовый. Перекрытия межэтажные – монолитное армированное из бетона. Кровля – сложная многоскатная с покрытием композитной черепицей.",
    details:
      "Площадь 1 этажа – 168,8кв.м, 2 этажа – 154,4кв.м, цокольного этажа с гаражом – 189,8кв.м., балконов и террас – 123,1кв.м.",
  },
  {
    id: "project-245",
    title: "Проект двухэтажного дома № 245",
    category: "two-story",
    projectNumber: "245",
    image: project245Image1,
    images: [
      project245Image1,
      project245Image2,
      project245Image3,
      project245Image4,
    ],
    area: "88,8 м² (1 этаж) + 89,3 м² (2 этаж) + 206,6 м² (цокольный этаж) + 48,0 м² (терраса) + 74,4 м² (гараж с тех.помещениями)",
    description:
      "Проект №245. Дом двухэтажный с 4 спальнями, цокольным этажом, 2 санузлами, гаражом и террасой. Наружные стены – комбинированные с облицовкой керамическим кирпичом. Перекрытия межэтажные – плиты железобетонные многопустотные. Кровля – сложная многоскатная с покрытием битумной черепицей.",
    details:
      "Площадь 1 этажа – 88,8кв.м, 2 этажа – 89,3кв.м, цокольного этажа –206,6кв.м., террасы – 48,0кв.м, гаража с тех.помещениями – 74,4кв.м.",
  },
  {
    id: "project-251",
    title: "Проект двухэтажного дома № 251",
    category: "two-story",
    projectNumber: "251",
    image: project251Image1,
    images: [project251Image1, project251Image2, project251Image3],
    area: "235,2 м² (1 этаж) + 147,8 м² (2 этаж) + 200,9 м² (цокольный этаж) + 55,5 м² (терраса) + 47,4 м² (гараж)",
    description:
      "Проект №251. Дом двухэтажный с 4 спальнями, цокольным этажом, 5 санузлами, бассейном, гаражом и террасой. Наружные стены – комбинированные с облицовкой керамическим кирпичом. Перекрытия межэтажные – плиты железобетонные многопустотные. Кровля – сложная многоскатная с покрытием металлочерепицей.",
    details:
      "Площадь 1 этажа – 235,2кв.м, 2 этажа – 147,8кв.м, цокольного этажа – 200,9кв.м., террасы – 55,5кв.м, гаража – 47,4кв.м.",
  },
  {
    id: "project-321",
    title: "Проект двухэтажного дома № 321",
    category: "two-story",
    projectNumber: "321",
    image: project321Image1,
    images: [
      project321Image1,
      project321Image2,
      project321Image3,
      project321Image4,
    ],
    area: "72,8 м² (1 этаж) + 68,3 м² (2 этаж) + 14,8 м² (терраса) + 24,8 м² (гараж) + 8,2 м² (подвал)",
    description:
      "Проект №321. Дом двухэтажный с 3 спальнями, кабинетом, 2 санузлами, гаражом, подвалом и террасой. Наружные стены – блоки газосиликатные с последующей отделкой по системе утепления. Перекрытия межэтажные – плиты железобетонные многопустотные. Кровля – вальмовая с покрытием металлочерепицей.",
    details:
      "Площадь 1 этажа – 72,8кв.м, 2 этажа – 68,3кв.м, террасы –14,8кв.м., гаража – 24,8кв.м, подвала – 8,2кв.м.",
  },
  {
    id: "project-501",
    title: "Проект двухэтажного дома № 501",
    category: "two-story",
    projectNumber: "501",
    image: project501Image1,
    images: [project501Image1, project501Image2, project501Image3],
    area: "99,4 м² (1 этаж) + 89,6 м² (2 этаж) + 16,1 м² (терраса)",
    description: "Проект №501. Дом двухэтажный с 4 спальнями, 4 санузлами, 2 кабинетами и террасой. Стены – блок с последующим утеплением. Перекрытия – ж/б плиты, деревянные балки.",
    details: "Площадь 1 этажа – 99,4кв.м, 2 этажа – 89,6кв.м, террасы – 16,1кв.м.",
  },
  {
    id: "project-496",
    title: "Проект двухэтажного дома № 496",
    category: "two-story",
    projectNumber: "496",
    image: project496Image1,
    images: [project496Image1, project496Image2, project496Image3],
    area: "59,7 м² (1 этаж) + 63,9 м² (2 этаж) + 9,5 м² (терраса)",
    description: "Проект №496. Дом двухэтажный с 3 спальнями, 2 санузлами, террасой. Стены – блок. Перекрытия – ж/б плиты, деревянные балки.",
    details: "Площадь 1 этажа – 59,7кв.м, 2 этажа – 63,9кв.м, террасы – 9,5кв.м.",
  },
  {
    id: "project-483",
    title: "Проект мансардного дома № 483",
    category: "mansard",
    projectNumber: "483",
    image: project483Image1,
    images: [project483Image1, project483Image2, project483Image3],
    area: "46,8 м² (1 этаж) + 14,7 м² (мансарда)",
    description: "Проект №483. Дом мансардный с 1 спальней, 1 санузлом. Стены – блок с последующим утеплением. Перекрытия – деревянные балки.",
    details: "Площадь 1 этажа – 46,8кв.м, мансарды – 14,7кв.м.",
  },
  {
    id: "project-307",
    title: "Проект мансардного дома № 307",
    category: "mansard",
    projectNumber: "307",
    image: project307Image1,
    images: [
      project307Image1,
      project307Image2,
      project307Image3,
      project307Image4,
    ],
    area: "109,9 м² (1 этаж) + 80,4 м² (мансарда) + 67,8 м² (цокольный этаж) + 47,4 м² (гараж) + 29,0 м² (терраса) + 20,6 м² (баня)",
    description:
      "Проект №307. Дом мансардный с 4 спальнями, 2 санузлами, цокольным этажом, баней и террасой. Наружные стены – комбинированные с облицовкой кирпичом. Перекрытия межэтажные – плиты железобетонные многопустотные. Кровля – сложная многоскатная с покрытием металлочерепицей.",
    details:
      "Площадь 1 этажа –109,9кв.м, мансарды – 80,4кв.м, цокольного этажа – 67,8кв.м, гаража – 47,4кв.м, террасы – 29,0кв.м, бани – 20,6кв.м.",
  },
  {
    id: "project-282",
    title: "Проект трехэтажного мансардного дома № 282",
    category: "mansard",
    projectNumber: "282",
    image: project282Image1,
    images: [
      project282Image1,
      project282Image2,
      project282Image3,
      project282Image4,
      project282Image5,
    ],
    area: "123,1 м² (1 этаж) + 89,1 м² (2 этаж) + 86,7 м² (3 этаж) + 33,1 м² (веранда) + 92,7 м² (подвал)",
    description:
      "Проект №282. Дом трехэтажный с 10 жилыми комнатами, 6 санузлами, подвалом и верандой. Наружные стены – блоки газосиликатные с последующей отделкой по системе утепления и частично из сруба. Перекрытия межэтажные – плиты железобетонные многопустотные. Кровля – двускатная с покрытием металлочерепицей.",
    details:
      "Площадь 1 этажа – 123,1кв.м, 2 этажа – 89,1кв.м, 3 этажа – 86,7кв.м; веранды – 33,1кв.м., подвала – 92,7кв.м.",
  },
];
