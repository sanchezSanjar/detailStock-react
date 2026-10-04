import { useEffect, useState } from "react";

export function useCountUp(target: number, duration: number = 1500) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        let frameId: number;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));

            if (progress < 1) {
                frameId = requestAnimationFrame(step);
            }
        };

        frameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frameId);
    }, [target, duration]);

    return count;
}
