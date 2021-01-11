window.addEventListener("load", ()=>{
   let long;
   let lat;
   let temperatureDescription = document.querySelector('.temperature-description')
   let temperatureDegree = document.querySelector('.temperature-degree')
   let locationTimezone = document.querySelector('.location-timezone')
   let temperatureSection = document.querySelector('.temperature')
   const temperatureSpan = document.querySelector('.temperature span')
   
   
   if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position=>{
          long = position.coords.longitude
          lat = position.coords.latitude;
           
           const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b86fd8f7708187a762619d1377a88ec7`;


            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                     const {feels_like} = data.main;
                    const {description} = data.weather[0];
                    // set DOM elements from API
                 temperatureDegree.textContent = feels_like;
                 temperatureDescription.textContent = description;
                 locationTimezone.textContent = data.name;

                 let celcius = (feels_like -32) * (5 / 9)

                //  change farheit t celcius
                temperatureSection.addEventListener('click',()=>{
                     if (temperatureSpan.textContent === "C"){
                       temperatureSpan.textContent = "F"
                       temperatureDegree.textContent = Math.floor(celcius);
                     }else{
                       temperatureSpan.textContent = "C"
                       temperatureDegree.textContent = feels_like;
                     }
                    

                   })
             })  
            })
    }
});