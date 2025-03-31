import { useEffect, useState } from "react";

export default function Clock() {

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

    const formatedTime = time.toLocaleTimeString(
        "en-UK",
        {timeZone: cities.timeZone,
        hour: "2-digit",
        minute: "2-digit"
    });

    return(
        <div>
            <div className = "city-time">{formatedTime}</div>
        </div>
    );
}