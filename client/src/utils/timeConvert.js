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

  const secondToString2 = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const wholeSeconds = Math.floor(seconds % 60);
  
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(wholeSeconds).padStart(2, '0');
  
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
  }

  const dateFormat = (dateObject ) => {
    // 提取年、月和日
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1，并确保两位数输出
    const day = String(dateObject.getDate()).padStart(2, '0'); // 确保两位数输出

    // 组合成特定格式的字符串
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }
  
  export { stringToSecond, secondToString, secondToString2, dateFormat };