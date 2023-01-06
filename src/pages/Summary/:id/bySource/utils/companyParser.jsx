export const getPace = (company, dateRange, docs) => {
    if( company && docs ) {
        console.log(docs)
        let countOfDocs = docs.length
        let workingDays = company?.company_working_days.map(e => {
            return e.charAt(0).toUpperCase() + e.slice(1)
        })
        let test = new Set()
        let countOfDays = 0;
        for ( let i = new Date(dateRange.startDate); i <= new Date(dateRange.endDate); i.setDate(i.getDate() + 1) ) {
            test.add(i.toLocaleString('en-US', { weekday: 'long' }))
            if(workingDays.includes(i.toLocaleString('en-US', { weekday: 'long' }))){
                countOfDays++;
            }
        }

        let countOfDaysInMonth = 0
        //Get the first day of the startDate's month
        let beginDate = new Date(new Date(dateRange.startDate).getFullYear(), new Date(dateRange.startDate).getMonth(), 1);

        //Get the last day of the endDate's month
        let lastDate = new Date(new Date(dateRange.endDate).getFullYear(), new Date(dateRange.endDate).getMonth() + 1, 0);
        //Loop through every date between start and end dates
        for (let i = beginDate; i <= lastDate; i.setDate(i.getDate() + 1)) {
            if(workingDays.includes(i.toLocaleString('en-US', { weekday: 'long' }))){
                countOfDaysInMonth++;
            }
        }


        return ((countOfDocs / countOfDays) * countOfDaysInMonth).toFixed(2);
    }
}