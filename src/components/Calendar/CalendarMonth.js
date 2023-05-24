import CalendarItem from './CalendarItem';

function CalendarMonth({ month, year, events, isAdmin }) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

    return (
        <>
            <h2>{monthNames[month] + ' ' + year}</h2>
            {events.sort((a, b) => {
                return a.date.getDate() - b.date.getDate();
            }).map((event) => {
                return (<CalendarItem
                    key={event.id}
                    id={event.id}
                    name={event.name}
                    date={event.date}
                    isAllDay={event.isAllDay}
                    location={event.location}
                    callRerender={event.callRerender}
                    isAdmin={isAdmin}
                ></CalendarItem>);
            })}
        </>
    );
}

export default CalendarMonth;