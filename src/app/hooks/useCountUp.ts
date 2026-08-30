import { useEffect, useState } from "react";

export function useCountUp(target: number, duration: number = 1500) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 3);
            setCount(Math.floor(progress * target));

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(target);
            }
        };

        requestAnimationFrame(step);
    }, [target, duration]);

    return count;
}