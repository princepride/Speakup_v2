const stringToSecond = (string) => {
    const [hours, minutes, seconds] = string.split(':');
    const [wholeSeconds, milliseconds] = seconds.split(',');
  
    const totalSeconds =
      parseInt(hours, 10) * 3600 +
      parseInt(minutes, 10) * 60 +
      parseInt(wholeSeconds, 10) +
      parseInt(milliseconds, 10) / 1000;
  
    return totalSeconds;
  }
  
  const secondToString = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const wholeSeconds = Math.floor(seconds % 60);
    const milliseconds = Math.round((seconds % 1) * 1000);
  
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(wholeSeconds).padStart(2, '0');
    const paddedMilliseconds = String(milliseconds).padStart(3, '0');
  
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds},${paddedMilliseconds}`;
  }
  
  export { stringToSecond, secondToString };