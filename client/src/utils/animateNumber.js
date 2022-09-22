function animateNumber(setFunction, start = 0, end = 0, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setFunction(Math.round((progress * (end - start) + start) * 10) / 10);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            setFunction(end);
        }
    };
    window.requestAnimationFrame(step);
}

export default animateNumber;
