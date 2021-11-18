import dayjs from 'dayjs';

export const addColumnsToAllDays = (allDays) => {
    const totPts = 472;

    function calcPointsPerDay(day) {
        if (day.Level === '' || day.TotProgPts === '') return '';
        const firstDay = day.Date;
        const lastDay = dayjs(allDays[allDays.length - 1].Date);
        const numDays = lastDay.diff(firstDay, 'day') + 1;
        return Math.round((totPts - day.TotProgPts) / numDays * 100) / 100;
    }

    function calcPointsPerWkDay(day) {
        if (day.Level === '' || day.ProgPt === '') return '';
        let numWkDays = 0;
        for (
            let dt = dayjs(day.Date);
            dt <= dayjs(allDays[allDays.length - 1].Date);
            dt = dt.add(1, 'day')
        ) if (dt.get('day') !== 0 & dt.get('day') !== 6) numWkDays++;
        return Math.round((totPts - day.TotProgPts) / numWkDays * 100) / 100;
    }

    const schedPtsPerDay = calcPointsPerDay(allDays[0]);
    let scheduled = 0;
    allDays.forEach(day => {
        scheduled += schedPtsPerDay;
        day.Scheduled = Math.round(scheduled);
        day.ReqPtPerDay = calcPointsPerDay(day);
        day.ReqPtPerWkDay = calcPointsPerWkDay(day);
    })
    return allDays;
}