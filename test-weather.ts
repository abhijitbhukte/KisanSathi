const lat = 21.1458;
const lon = 79.0882;
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&hourly=precipitation_probability,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FKolkata`)
  .then(res => res.json())
  .then(data => {
    console.log("Current Temp:", data.current.temperature_2m);
    console.log("Daily Max Prob:", data.daily.precipitation_probability_max[0]);
    
    // Find next rain time
    const now = new Date();
    const currentHourStr = now.toISOString().slice(0, 13) + ":00"; // roughly matches open-meteo time format
    
    // Open-meteo returns time in local timezone (Asia/Kolkata) because we asked for it
    // Let's just find the first index where time > now and probability > 20%
    const times = data.hourly.time;
    const probs = data.hourly.precipitation_probability;
    
    const currentIndex = times.findIndex((t: string) => new Date(t).getTime() >= now.getTime());
    
    let nextRainTime = null;
    let nextRainProb = 0;
    
    if (currentIndex !== -1) {
      for (let i = currentIndex; i < Math.min(currentIndex + 24, times.length); i++) {
        if (probs[i] > 30) {
          nextRainTime = times[i];
          nextRainProb = probs[i];
          break;
        }
      }
    }
    console.log("Next rain time:", nextRainTime, "Prob:", nextRainProb);
  });
