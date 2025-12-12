import { type Session, schedule } from "./schedule";

// Class hours: 09:00 - 13:00 Lisbon time
const CLASS_START_HOUR = 9;
const CLASS_END_HOUR = 13;
const CLASS_DURATION_HOURS = CLASS_END_HOUR - CLASS_START_HOUR;

// Month mapping for Portuguese months
const monthToNumber: Record<Session["month"], number> = {
  Novembro: 10, // November (0-indexed)
  Dezembro: 11, // December
  Janeiro: 0, // January (next year)
};

function getSessionDate(session: Session): Date {
  // Determine the year based on the month
  const year = session.month === "Janeiro" ? 2026 : 2025;
  const month = monthToNumber[session.month];
  return new Date(year, month, session.day);
}

function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// Get unique session dates with their total hours
function getSessionDates(): Map<string, number> {
  const dateHours = new Map<string, number>();

  for (const session of schedule.sessions) {
    const date = getSessionDate(session);
    const key = formatDateKey(date);
    const existing = dateHours.get(key) || 0;
    dateHours.set(key, existing + session.hours);
  }

  return dateHours;
}

// Get total hours from the schedule
export function getTotalHours(): number {
  return schedule.sessions.reduce((sum, session) => sum + session.hours, 0);
}

// Calculate elapsed hours based on current Lisbon time
export function getElapsedHours(): number {
  const now = new Date();

  // Convert to Lisbon time
  const lisbonTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Lisbon" })
  );

  const sessionDates = getSessionDates();
  let elapsed = 0;

  // Get all dates sorted
  const sortedDates = Array.from(sessionDates.keys()).sort();

  for (const dateKey of sortedDates) {
    const [year, month, day] = dateKey.split("-").map(Number);

    // Create class start and end times for this session
    const classStart = new Date(year, month - 1, day, CLASS_START_HOUR, 0, 0);
    const classEnd = new Date(year, month - 1, day, CLASS_END_HOUR, 0, 0);

    const sessionHours = sessionDates.get(dateKey) ?? 0;

    if (lisbonTime >= classEnd) {
      // Session is fully completed
      elapsed += sessionHours;
    } else if (lisbonTime >= classStart && lisbonTime < classEnd) {
      // Currently in session - calculate partial hours
      const hoursIntoClass =
        (lisbonTime.getTime() - classStart.getTime()) / (1000 * 60 * 60);
      // Scale by session hours (in case session is less than 4 hours)
      const fractionComplete = hoursIntoClass / CLASS_DURATION_HOURS;
      elapsed += sessionHours * fractionComplete;
    }
    // If before classStart, add nothing
  }

  return elapsed;
}

// Get remaining hours
export function getRemainingHours(): number {
  return getTotalHours() - getElapsedHours();
}

// Get current session info (if currently in class)
export function getCurrentSession(): {
  isInClass: boolean;
  currentModule: string | null;
  sessionNumber: number | null;
  timeRemainingInClass: number | null; // minutes
} {
  const now = new Date();
  const lisbonTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Lisbon" })
  );

  const currentDateKey = formatDateKey(lisbonTime);
  const sessionDates = getSessionDates();

  if (!sessionDates.has(currentDateKey)) {
    return {
      isInClass: false,
      currentModule: null,
      sessionNumber: null,
      timeRemainingInClass: null,
    };
  }

  const currentHour = lisbonTime.getHours();
  const currentMinute = lisbonTime.getMinutes();

  if (currentHour < CLASS_START_HOUR || currentHour >= CLASS_END_HOUR) {
    return {
      isInClass: false,
      currentModule: null,
      sessionNumber: null,
      timeRemainingInClass: null,
    };
  }

  // Find the session for today
  const todaySessions = schedule.sessions.filter((s) => {
    const sessionDate = getSessionDate(s);
    return formatDateKey(sessionDate) === currentDateKey;
  });

  if (todaySessions.length === 0) {
    return {
      isInClass: false,
      currentModule: null,
      sessionNumber: null,
      timeRemainingInClass: null,
    };
  }

  // Calculate time remaining in class
  const classEndMinutes = CLASS_END_HOUR * 60;
  const currentMinutes = currentHour * 60 + currentMinute;
  const timeRemainingInClass = classEndMinutes - currentMinutes;

  return {
    isInClass: true,
    currentModule: null,
    sessionNumber: todaySessions[0].session,
    timeRemainingInClass,
  };
}

// Get next session info
export function getNextSession(): {
  date: Date;
  sessionNumber: number;
  daysUntil: number;
  hoursUntilStart: number;
} | null {
  const now = new Date();
  const lisbonTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Lisbon" })
  );

  const currentDateKey = formatDateKey(lisbonTime);
  const currentHour = lisbonTime.getHours();

  // Find the next session
  for (const session of schedule.sessions) {
    const sessionDate = getSessionDate(session);
    const sessionDateKey = formatDateKey(sessionDate);

    // Skip past sessions
    if (sessionDateKey < currentDateKey) continue;

    // If it's today but class is over, skip
    if (sessionDateKey === currentDateKey && currentHour >= CLASS_END_HOUR)
      continue;

    // If it's today and class hasn't started or is in progress, this is current/next
    if (sessionDateKey === currentDateKey && currentHour >= CLASS_START_HOUR)
      continue;

    // Calculate time until this session
    const classStart = new Date(
      sessionDate.getFullYear(),
      sessionDate.getMonth(),
      sessionDate.getDate(),
      CLASS_START_HOUR,
      0,
      0
    );

    const msUntil = classStart.getTime() - lisbonTime.getTime();
    const hoursUntilStart = msUntil / (1000 * 60 * 60);

    // Calculate days until based on calendar dates, not hours
    // Compare just the date parts (ignoring time)
    const todayDate = new Date(
      lisbonTime.getFullYear(),
      lisbonTime.getMonth(),
      lisbonTime.getDate()
    );
    const sessionDateOnly = new Date(
      sessionDate.getFullYear(),
      sessionDate.getMonth(),
      sessionDate.getDate()
    );
    const msDiff = sessionDateOnly.getTime() - todayDate.getTime();
    const daysUntil = Math.round(msDiff / (1000 * 60 * 60 * 24));

    return {
      date: sessionDate,
      sessionNumber: session.session,
      daysUntil,
      hoursUntilStart,
    };
  }

  return null;
}

// Check if the course is complete
export function isCourseComplete(): boolean {
  const now = new Date();
  const lisbonTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Lisbon" })
  );

  const lastSession = schedule.sessions[schedule.sessions.length - 1];
  const lastDate = getSessionDate(lastSession);
  const lastClassEnd = new Date(
    lastDate.getFullYear(),
    lastDate.getMonth(),
    lastDate.getDate(),
    CLASS_END_HOUR,
    0,
    0
  );

  return lisbonTime >= lastClassEnd;
}

// Get course info
export function getCourseInfo() {
  return {
    name: schedule.course.name,
    totalHours: getTotalHours(),
    startDate: schedule.course.startDate,
    endDate: schedule.course.endDate,
    location: schedule.course.location,
  };
}
