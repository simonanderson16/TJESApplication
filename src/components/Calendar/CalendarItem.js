import { db } from '../../firebase';
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';

function CalendarItem({ id, name, date, isAllDay, location, callRerender }) {

    const [editMode, setEditMode] = useState(false);
    const [allDay, setAllDay] = useState(isAllDay ?? false);

    console.log(allDay);

    return (
        <div className='calendar-event-info'>
            <div className='calendar-event-main-body'>
                <div className='calendar-event-info-left'>
                    <h3 hidden={editMode}>{name}</h3>
                    <h4 hidden={!editMode}>Event Name:</h4>
                    <input hidden={!editMode} id={`nameInput` + id} defaultValue={name}></input>
                    <p hidden={editMode}>{location}</p>
                    <p hidden={!editMode}>Event Location:</p>
                    <input hidden={!editMode} id={`locationInput` + id} defaultValue={location}></input>
                </div>
                <div className='calendar-event-info-right'>
                    <p hidden={editMode}>{date.getMonth() + 1 + '/' + date.getDate() + '/' + (date.getFullYear())}</p>
                    <p hidden={!editMode}>Event Date:</p>
                    <input hidden={!editMode} id={`dateInput` + id} type='date' defaultValue={date?.getFullYear() + '-' + (date?.getMonth() < 9 ? '0' : '') + (date?.getMonth() + 1) + '-' + (date?.getDate() < 10 ? '0' : '') + date?.getDate()}/>
                    <p hidden={editMode || allDay}>{date?.getHours() % 12 + ':' + (date?.getMinutes() < 10 ? '0' : '') + date?.getMinutes() + (date?.getHours() < 12 ? ' AM' : ' PM')}</p>
                    <p hidden={editMode || !allDay}>All Day</p>
                    <p hidden={!editMode}>Event Time:</p>
                    <input hidden={!editMode || allDay} id={`timeInput` + id} type='time' defaultValue={date?.getHours() + ':' + (date?.getMinutes() < 10 ? '0' : '') + date?.getMinutes()}/>
                    <input hidden={!editMode} id={`isAllDay${id}`} type='checkbox' checked={allDay} onChange={(e) => setAllDay(e.target.checked)}/>
                    <label hidden={!editMode} htmlFor={`isAllDay${id}`}>All Day</label>
                </div>
            </div>
            <div hidden={editMode}>
                <button className='calendar-edit-buttons' onClick={() => setEditMode(true)}>Modify</button>
                <button className='calendar-edit-buttons' onClick={async () => {
                    await deleteDoc(doc(db, 'Event', id));
                    callRerender();
                }}>Delete</button>
            </div>
            <div hidden={!editMode}>
                <button className='calendar-edit-buttons' onClick={async () => {
                    await setDoc(doc(db, 'Event', id), {
                        name: document.getElementById('nameInput' + id).value,
                        date: new Date(document.getElementById('dateInput' + id).value + ' ' + document.getElementById('timeInput' + id).value),
                        location: document.getElementById('locationInput' + id).value,
                        isAllDay: allDay
                    });
                    setEditMode(false);
                    callRerender();
                }}>Save</button>
                <button className='calendar-edit-buttons' onClick={() => { setEditMode(false) }}>Discard</button>
            </div>
        </div>
    );
}

export default CalendarItem;