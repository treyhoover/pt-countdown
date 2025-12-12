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
  hours: number;
}

export interface Schedule {
  course: Course;
  sessions: Session[];
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
    // Novembro
    { month: "Novembro", day: 20, session: 1, hours: 4 },
    { month: "Novembro", day: 21, session: 2, hours: 4 },
    // Nov 22-23: Weekend
    { month: "Novembro", day: 24, session: 3, hours: 4 },
    { month: "Novembro", day: 25, session: 4, hours: 4 },
    { month: "Novembro", day: 26, session: 5, hours: 4 },
    { month: "Novembro", day: 27, session: 6, hours: 4 },
    { month: "Novembro", day: 28, session: 7, hours: 4 },
    // Nov 29-30: Weekend
    // Dec 1: Holiday (Restoration of Independence)
    // Dezembro
    { month: "Dezembro", day: 2, session: 8, hours: 4 },
    { month: "Dezembro", day: 3, session: 9, hours: 4 },
    // Dec 4: Day off
    { month: "Dezembro", day: 5, session: 10, hours: 4 },
    // Dec 6-8: Weekend + Immaculate Conception holiday
    { month: "Dezembro", day: 9, session: 11, hours: 4 },
    { month: "Dezembro", day: 10, session: 12, hours: 4 },
    { month: "Dezembro", day: 11, session: 13, hours: 4 },
    { month: "Dezembro", day: 12, session: 14, hours: 4 },
    // Dec 13-14: Weekend
    // Dec 15: Day off
    { month: "Dezembro", day: 16, session: 15, hours: 4 },
    { month: "Dezembro", day: 17, session: 16, hours: 4 },
    { month: "Dezembro", day: 18, session: 17, hours: 4 },
    { month: "Dezembro", day: 19, session: 18, hours: 4 },
    // Dec 20-21: Weekend
    { month: "Dezembro", day: 22, session: 19, hours: 4 },
    // Dec 23 - Jan 4: Holiday break
    // Janeiro
    { month: "Janeiro", day: 5, session: 20, hours: 4 },
    { month: "Janeiro", day: 6, session: 21, hours: 4 },
    { month: "Janeiro", day: 7, session: 22, hours: 4 },
    { month: "Janeiro", day: 8, session: 23, hours: 4 },
    // Jan 9-11: Weekend + Day off
    { month: "Janeiro", day: 12, session: 24, hours: 4 },
    { month: "Janeiro", day: 13, session: 25, hours: 4 },
    { month: "Janeiro", day: 14, session: 26, hours: 4 },
    { month: "Janeiro", day: 15, session: 27, hours: 4 },
    { month: "Janeiro", day: 16, session: 28, hours: 4 },
    // Jan 17-18: Weekend
    { month: "Janeiro", day: 19, session: 29, hours: 4 },
    { month: "Janeiro", day: 20, session: 30, hours: 4 },
    { month: "Janeiro", day: 21, session: 31, hours: 4 },
    { month: "Janeiro", day: 22, session: 32, hours: 4 },
    { month: "Janeiro", day: 23, session: 33, hours: 4 },
    // Jan 24-25: Weekend
    { month: "Janeiro", day: 26, session: 34, hours: 4 },
    { month: "Janeiro", day: 27, session: 35, hours: 4 },
    { month: "Janeiro", day: 28, session: 36, hours: 4 },
    { month: "Janeiro", day: 29, session: 37, hours: 4 },
    { month: "Janeiro", day: 30, session: 38, hours: 2 },
  ],
};
