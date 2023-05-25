import './Calendar.css';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { getUser } from '../App';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import CalendarItem from './CalendarItem';

function Calendar() {
    const [events, setEvents] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeEvent, setActiveEvent] = useState(null);

    const getIsAdmin = async () => {
        const response = await getUser();
        if (response?.userObject?.userType === 'admin')
            setIsAdmin(true);
        else
            setIsAdmin(false);
    }

    const getEvents = async () => {
        const documents = await getDocs(collection(db, 'Event'));
        let tempEvents = [];
        documents.forEach((doc) => {
            const cleanDate = new Date(doc.data()?.date?.seconds * 1000);

            tempEvents.push({
                id: doc.id,
                title: doc.data().name,
                start: cleanDate,
                allDay: doc.data().isAllDay,
                extendedProps: {
                    location: doc.data().location
                }

            })
        });
        setEvents(tempEvents);
        setActiveEvent(false);
    }

    useEffect(() => {
        getEvents();
    }, []);

    getIsAdmin();

    return (
        <div className="calendar-container">
            <h1>Calendar</h1>
            <button className='calendar-edit-buttons' hidden={!isAdmin} onClick={() => {
                const id = Math.random().toString();
                setActiveEvent(<CalendarItem
                    //FIX THIS
                    id={id}
                    key={id}
                    name=''
                    location=''
                    date={new Date()}
                    isAllDay={false}
                    callRerender={getEvents}
                    isAdmin={isAdmin}
                    isEdit={true}
                ></CalendarItem>);
            }}>Add Event</button>
            <div className='calendar-object'>
                <div className='calendar-editing-space'>
                {activeEvent}
                </div>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    contentHeight={650}
                    aspectRatio={2}
                    events={events}
                    eventClick={(info) => setActiveEvent(
                        <CalendarItem
                            id={info.event.id}
                            key={info.event.id}
                            name={info.event.title}
                            location={info.event.extendedProps.location}
                            date={info.event.start}
                            isAllDay={info.event.allDay}
                            callRerender={getEvents}
                            isAdmin={isAdmin}
                            isEdit={false}
                        ></CalendarItem>
                    )} />
            </div>
        </div>
    )
}

export default Calendar;