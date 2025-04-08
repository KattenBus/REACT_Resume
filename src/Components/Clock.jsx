import { useEffect, useState } from "react";

export default function Clock() {

    let separator = ":";
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        return () => {
            clearInterval(timer)
        }
    });

    const cities = [{
        name: "Stockholm",
        timeZone: "Europe/Stockholm",
    }];

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');

    return(
        <div>
            <div className = "city-time">                
                <span className="time-hour">{hours}</span>
                <span className="time-separator">{separator}</span>
                <span className="time-minute">{minutes}</span>
            </div>
        </div>
    );
}