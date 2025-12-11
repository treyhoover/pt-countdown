export interface Course {
  name: string;
  totalHours: number;
  startDate: string;
  endDate: string;
  schedule: string;
  location: string;
}

export interface Session {
  month: "Novembro" | "Dezembro" | "Janeiro";
  day: number;
  session: number;
  module: string;
  hours: number;
  note?: string;
}

export interface Module {
  code: string;
  name: string;
  totalHours: number;
}

export interface Schedule {
  course: Course;
  sessions: Session[];
  modules: Module[];
}

export const schedule: Schedule = {
  course: {
    name: "Português A1 + A2",
    totalHours: 150,
    startDate: "2025-11-20",
    endDate: "2026-01-30",
    schedule: "2ªs, 3ªs, 4ªs, 5ªs e 6ªs das 09h00 às 13h00",
    location: "Online",
  },
  sessions: [
    { month: "Novembro", day: 20, session: 1, module: "UFCD 6452 - Eu e minha rotina diária", hours: 4.0 },
    { month: "Novembro", day: 21, session: 2, module: "UFCD 6452 - Eu e minha rotina diária", hours: 4.0 },
    { month: "Novembro", day: 24, session: 3, module: "UFCD 6452 - Eu e minha rotina diária", hours: 4.0 },
    { month: "Novembro", day: 25, session: 4, module: "UFCD 6452 - Eu e minha rotina diária", hours: 4.0 },
    { month: "Novembro", day: 26, session: 5, module: "UFCD 6452 - Eu e minha rotina diária", hours: 4.0 },
    { month: "Novembro", day: 27, session: 6, module: "UFCD 6452 - Eu e minha rotina diária", hours: 4.0 },
    { month: "Novembro", day: 28, session: 7, module: "UFCD 6452 - Eu e minha rotina diária", hours: 1.0, note: "Split session" },
    { month: "Novembro", day: 28, session: 7, module: "UFCD 6453 - Hábitos alimentares, cultura e lazer", hours: 3.0, note: "Split session" },
    { month: "Dezembro", day: 2, session: 8, module: "UFCD 6453 - Hábitos alimentares, cultura e lazer", hours: 4.0 },
    { month: "Dezembro", day: 3, session: 9, module: "UFCD 6453 - Hábitos alimentares, cultura e lazer", hours: 4.0 },
    { month: "Dezembro", day: 9, session: 10, module: "UFCD 6453 - Hábitos alimentares, cultura e lazer", hours: 4.0 },
    { month: "Dezembro", day: 10, session: 11, module: "UFCD 6453 - Hábitos alimentares, cultura e lazer", hours: 4.0 },
    { month: "Dezembro", day: 11, session: 12, module: "UFCD 6453 - Hábitos alimentares, cultura e lazer", hours: 2.0, note: "Split session" },
    { month: "Dezembro", day: 11, session: 12, module: "UFCD 6454 - O corpo humano, saúde e serviços", hours: 2.0, note: "Split session" },
    { month: "Dezembro", day: 12, session: 13, module: "UFCD 6454 - O corpo humano, saúde e serviços", hours: 4.0 },
    { month: "Dezembro", day: 13, session: 14, module: "UFCD 6454 - O corpo humano, saúde e serviços", hours: 4.0 },
    { month: "Dezembro", day: 16, session: 15, module: "UFCD 6454 - O corpo humano, saúde e serviços", hours: 4.0 },
    { month: "Dezembro", day: 17, session: 16, module: "UFCD 6454 - O corpo humano, saúde e serviços", hours: 4.0 },
    { month: "Dezembro", day: 18, session: 17, module: "UFCD 6454 - O corpo humano, saúde e serviços", hours: 4.0 },
    { month: "Dezembro", day: 19, session: 18, module: "UFCD 6454 - O corpo humano, saúde e serviços", hours: 4.0 },
    { month: "Dezembro", day: 22, session: 19, module: "UFCD 6454 - O corpo humano, saúde e serviços", hours: 3.0, note: "Split session" },
    { month: "Dezembro", day: 22, session: 19, module: "UFCD 6455 - Eu e o mundo do trabalho", hours: 1.0, note: "Split session" },
    { month: "Janeiro", day: 5, session: 20, module: "UFCD 6455 - Eu e o mundo do trabalho", hours: 4.0 },
    { month: "Janeiro", day: 6, session: 21, module: "UFCD 6455 - Eu e o mundo do trabalho", hours: 4.0 },
    { month: "Janeiro", day: 7, session: 22, module: "UFCD 6455 - Eu e o mundo do trabalho", hours: 4.0 },
    { month: "Janeiro", day: 8, session: 23, module: "UFCD 6455 - Eu e o mundo do trabalho", hours: 4.0 },
    { month: "Janeiro", day: 12, session: 24, module: "UFCD 6455 - Eu e o mundo do trabalho", hours: 4.0 },
    { month: "Janeiro", day: 13, session: 25, module: "UFCD 6455 - Eu e o mundo do trabalho", hours: 4.0 },
    { month: "Janeiro", day: 14, session: 26, module: "UFCD 6456 - O meu passado e o meu presente", hours: 4.0 },
    { month: "Janeiro", day: 15, session: 27, module: "UFCD 6456 - O meu passado e o meu presente", hours: 4.0 },
    { month: "Janeiro", day: 16, session: 28, module: "UFCD 6456 - O meu passado e o meu presente", hours: 4.0 },
    { month: "Janeiro", day: 19, session: 29, module: "UFCD 6456 - O meu passado e o meu presente", hours: 4.0 },
    { month: "Janeiro", day: 20, session: 30, module: "UFCD 6456 - O meu passado e o meu presente", hours: 4.0 },
    { month: "Janeiro", day: 21, session: 31, module: "UFCD 6456 - O meu passado e o meu presente", hours: 1.0, note: "Split session" },
    { month: "Janeiro", day: 21, session: 31, module: "UFCD 6457 - Comunicação e vida em sociedade", hours: 3.0, note: "Split session" },
    { month: "Janeiro", day: 26, session: 34, module: "UFCD 6457 - Comunicação e vida em sociedade", hours: 4.0 },
    { month: "Janeiro", day: 27, session: 35, module: "UFCD 6457 - Comunicação e vida em sociedade", hours: 4.0 },
    { month: "Janeiro", day: 28, session: 36, module: "UFCD 6457 - Comunicação e vida em sociedade", hours: 4.0 },
    { month: "Janeiro", day: 29, session: 37, module: "UFCD 6457 - Comunicação e vida em sociedade", hours: 4.0 },
    { month: "Janeiro", day: 30, session: 38, module: "UFCD 6457 - Comunicação e vida em sociedade", hours: 2.0 },
  ],
  modules: [
    { code: "UFCD 6452", name: "Eu e minha rotina diária", totalHours: 25 },
    { code: "UFCD 6453", name: "Hábitos alimentares, cultura e lazer", totalHours: 25 },
    { code: "UFCD 6454", name: "O corpo humano, saúde e serviços", totalHours: 25 },
    { code: "UFCD 6455", name: "Eu e o mundo do trabalho", totalHours: 25 },
    { code: "UFCD 6456", name: "O meu passado e o meu presente", totalHours: 25 },
    { code: "UFCD 6457", name: "Comunicação e vida em sociedade", totalHours: 25 },
  ],
};
