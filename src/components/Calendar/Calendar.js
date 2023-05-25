import './Calendar.css';
import { useState, useEffect } from 'react';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { getUser } from '../../App';
import CalendarMonth from './CalendarMonth';

function Calendar() {
    const [events, setEvents] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const getIsAdmin = async () => {
        const response = await getUser();
        if (response?.userObject?.userType === 'admin')
            setIsAdmin(true);
        else
            setIsAdmin(false);
    }

    const getEvents = async () => {
        const documents = await getDocs(collection(db, 'Event'));
        let tempMonths = [];
        documents.forEach((doc) => {
            const cleanDate = new Date(doc.data()?.date?.seconds * 1000);
            const foundMonth = tempMonths.find(element => element.month === cleanDate.getMonth() && element.year === cleanDate.getFullYear())
            if (foundMonth) {
                foundMonth.schedule.push({
                    key: doc.id,
                    id: doc.id,
                    name: doc.data().name,
                    date: cleanDate,
                    location: doc.data().location,
                    callRerender: getEvents
                })
            } else {
                tempMonths.push({
                    month: cleanDate.getMonth(),
                    year: cleanDate.getFullYear(),
                    schedule: [
                        {
                            key: doc.id,
                            id: doc.id,
                            name: doc.data().name,
                            date: cleanDate,
                            isAllDay: doc.data()?.isAllDay,
                            location: doc.data().location,
                            callRerender: getEvents
                        }
                    ]
                })
            }
        });
        setEvents(tempMonths);
    }

    useEffect(() => {
        getEvents();
    }, []);

    getIsAdmin();

    return (
        <div className="calendar-container">
            <h1>Calendar</h1>
            <button className='calendar-edit-buttons' hidden={!isAdmin} onClick={async () => {
                //Need to ensure no collisions
                const id = Math.random().toString();
                await setDoc(doc(db, 'Event', id), {
                    name: '',
                    location: '',
                    date: new Date("0")
                });
                getEvents();
            }}>Add Event</button>
            {events.sort((a, b) => {
                return a.year - b.year === 0 ? a.month - b.month : a.year - b.year;
            }).map((months) => {
                return <CalendarMonth
                    key={months.month.toString() + months.year}
                    month={months.month}
                    year={months.year}
                    events={months.schedule}
                    isAdmin={isAdmin}
                ></CalendarMonth>
            })}
        </div>
    )
}

export default Calendar;