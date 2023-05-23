function FluxCalendarItem({ name, date, location }) {
    return (
        <div id='event-info'>
            <table>
                <tbody>
                    <td id='event-info-left'>
                        <div>
                            <input value={name}></input>
                        </div>
                        <input value={location}></input>
                    </td>
                    <td id='event-info-right'>
                        <div>
                            <input type=""></input>
                        </div>
                        <input value={new Date(date?.seconds * 1000).toString()}></input>
                    </td>
                </tbody>
            </table>
            <button>Save</button>            
            <button>Discard</button>            
        </div>
    );
}

export default FluxCalendarItem;