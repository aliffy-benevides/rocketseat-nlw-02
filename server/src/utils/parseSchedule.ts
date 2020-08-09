interface ScheduleItem {
	week_day: number;
	from: string;
	to: string;
}

interface ScheduleItemDB {
	week_day: number;
	from: number;
  to: number;
  class_id: number;
}

// @param timeString = Format HH:mm
export function convertTimeStringToMinutes(timeString: string): number {
	const [hours, minutes] = timeString.split(':').map(Number);

	return (60*hours + minutes);
}

function parseSchedule(schedule: Array<ScheduleItem>, class_id: number): Array<ScheduleItemDB> {
	return schedule.map(scheduleItem => ({
		...scheduleItem,
		from: convertTimeStringToMinutes(scheduleItem.from),
    to: convertTimeStringToMinutes(scheduleItem.to),
    class_id
	}))
}

export default parseSchedule;