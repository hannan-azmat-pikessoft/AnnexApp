import { useEffect, useState } from 'react';

export default function useCounter(
    timerState = 'stop',
    setCounter,
    timerValue
) {
    const [interval, setIntervalVal] = useState(0);
    useEffect(() => {
        if (timerState === 'start') {
            const current_time = new Date();
            const diff = (current_time.getTime() - new Date().getTime()) / 1000;
            const timer = setInterval(() => {
                setCounter(timerValue - 1)
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        } else if (timerState === 'pause') {
            const timer = setInterval(() => {
                setIntervalVal(i => i + 1);
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        } else if (timerState === 'stop') {
            setIntervalVal(0);
        }
    }, [timerState, timerValue]);
}