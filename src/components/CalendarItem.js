function CalendarItem({ name, date, location }) {
    return (
        <div id='event-info'>
            <table>
                <tbody>
                    <td id='event-info-left'>
                        <h3>{name}</h3>
                        <p>{location}</p>
                    </td>
                    <td id='event-info-right'>
                        <p>{new Date(date?.seconds * 1000).toString()}</p>
                        <p>Event Time</p>
                    </td>
                </tbody>
            </table>
            <button>Modify</button><button>Delete</button>
        </div>
    );
}

export default CalendarItem;