import './Calendar.css';
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import CalendarItem from './CalendarItem';
import FluxCalendarItem from './FluxCalendarItem';

export default function Calendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const documents = await getDocs(collection(db, 'Event'));
            let tempEvents = [];
            documents.forEach((doc) => {
                tempEvents.push(
                    <>
                        <CalendarItem
                            name={doc.data()?.name}
                            date={doc.data()?.date}
                            location={doc.data()?.location}
                        ></CalendarItem>
                        <FluxCalendarItem
                            name={doc.data()?.name}
                            date={doc.data()?.date}
                            location={doc.data()?.location}
                        ></FluxCalendarItem>

                    </>
                )
            });
            setEvents(tempEvents);
        }
        getEvents();
    }, []);

    return (
        <div className="calendar-container">
            <h1>Calendar</h1>
            <h2>May 2023</h2>
            <button>Add Event</button>
            {events}
            {/*<table>
                <tbody>
                    <tr>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                    </tr>
                    <tr>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                    </tr>
                    <tr>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                    </tr>
                    <tr>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                    </tr>
                    <tr>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                        <td><button className="calendarDay"></button></td>
                    </tr>
                </tbody>
    </table>*/}

        </div>
    )
}