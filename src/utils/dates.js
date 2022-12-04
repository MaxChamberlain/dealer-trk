// Get the number of Sundays between two dates
function getDaysInRange(startDate, endDate, dayOfWeekDate) {

    // If dayOfWeekDate is the word for the day of the week, convert it to a number
    if (typeof dayOfWeekDate === 'string') {
        dayOfWeekDate = getDayOfWeekNumber(dayOfWeekDate);
    }

    // Create a Date object from the start and end dates
    let start = new Date(startDate);
    let end = new Date(endDate);
    let dayOfWeek = new Date().setDate(dayOfWeekDate);
  
    // Initialize a count
    let count = 0;
  
    // Loop through the dates
    while (start <= end) {
      // Check if the current date is a Sunday
      if (start.getDay() === 0) count++;
  
      // Move to the next day
      start.setDate(start.getDate() + 1);
    }
  
    return count;
  }

const getDayOfWeekNumber = dayOfWeek => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days.indexOf(dayOfWeek.toLowerCase());
}