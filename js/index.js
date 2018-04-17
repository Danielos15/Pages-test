// Make a few global variables so I can access them anywhere.
var globalStations = '';
var lastFetch = new Date();

/*
  Object with all the valid stations, 
  the Key is the name of the station
  the Value is the ID from vedur.is
*/
var validStations = { 
  "Akureyri" : 422,
  "Arnarnesvegur" : 31109,
  "Árnes" : 6420,
  "Ásbyrgi" : 4614,
  "Ásgarður" : 2175,
  "Bergstaðir" : 361,
  "Bíldudalur" : 2428,
  "Bjargtangar" : 2304,
  "Bjarnarey" : 4472,
  "Bláfjöll" : 1486,
  "Blönduós" : 3317,
  "Blönduós Vegagerðarstöð" : 33419,
  "Bolungarvík" : 252,
  "Brattabrekka	" : 31985,
  "Breiðdalsheiði" : 35965,
  "Brú á Jökuldal" : 5940,
  "Búrfell" : 6430,
  "Egilsstaðaflugvöllur" : 571,
  "Ennisháls" : 32390,
  "Eskifjörður" : 5981,
  "Eyjabakkar" : 5943,
  "Eyrarbakki" : 1395,
  "Fagridalur" : 34073,
  "Fjarðarheiði" : 34175,
  "Flateyri" : 2631,
  "Fróðárheiði" : 31931,
  "Gagnheiði" : 4275,
  "Garðabær - Kauptún" : 31475,
  "Garðskagaviti" : 1453,
  "Geldinganes" : 1480,
  "Gjögurflugvöllur" : 2692,
  "Grindavík" : 1361,
  "Grímsey" : 3976,
  "Grímsstaðir á Fjöllum" : 4323,
  "Gufuskálar" : 1919,
  "Gullfoss" : 36519,
  "Hafnarfjall" : 31674,
  "Hallormsstaður" : 4060,
  "Hágöngur" : 6776,
  "Hálfdán" : 32322,
  "Hálsar" : 34733,
  "Hellisheiði" : 31392,
  "Hellisskarð" : 1490,
  "Hnífsdalur" : 2643,
  "Holtavörðuheiði" : 32097,
  "Hornbjargsviti" : 2862,
  "Hólasandur" : 33495,
  "Hólmavík" : 2481,
  "Hólmsheiði" : 1481,
  "Hraunsmúli" : 31840,
  "Húsafell" : 6802,
  "Húsavík" : 3696,
  "Hvalnes" : 35666,
  "Hvammur" : 36127,
  "Hvanneyri" : 1779,
  "Hveravellir" : 6935,
  "Höfn í Hornafirði" : 705
};

/*
  Object with all the forcast icons to be used depending on the weather description
  The Key is the string coming from Vedur.is
  The Value is the Icon class
  Could also be done with a Switch Statement, both ways are equaly good.
*/
var getForecastIcon = {
  "Heiðskírt"                 : "day-sunny",
  "Léttskýjað"                : "day-cloudy",
  "Skýjað"                    : "night-cloudy",
  "Alskýjað"                  : "cloudy",
  "Lítils háttar rigning"     : "day-showers",
  "Rigning"                   : "day-rain",
  "Lítils háttar slydda "     : "day-sleet",
  "Slydda"                    : "sleet",
  "Lítils háttar snjókoma"    : "day-snow",
  "Snjókoma"                  : "snow",
  "Skúrir"                    : "day-showers",
  "Slydduél"                  : "day-snow",
  "Snjóél"                    : "day-snow",
  "Skýstrókar"                : "tornado",
  "Moldrok"                   : "tornado",
  "Skafrenningur"             : "strong-wind",
  "Þoka"                      : "fog",
  "Lítils háttar súld"        : "day-sprinkle",
  "Súld"                      : "sprinkle",
  "Frostrigning"              : "day-snow",
  "Hagl"                      : "day-snow-wind",
  "Lítils háttar þrumuveður"  : "day-thunderstorm",
  "Þrumuveður"                : "thunderstorm"
}

/*
  Array with all month names in order to display month name.
*/
var getMonth = [
  'Janúar', 'Febrúar', 'Mars', 'Apríl', 'Mai', 'Júní', 'Julí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'
]

/*
  Object with all the Wind directions availible from Vedur.is
  Key is the value coming from the Vedur.is forecast
  Value is the text I want to display.
*/
var getWindDirection = {
  Logn  : 'Logn',
  N     : 'Norðan',
  NNA   : 'Norð-norð-austan',
  ANA   : 'Aust-norð-austan',
  A     : 'Austan',
  ASA   : 'Aust-suð-austan',
  SA    : 'Suð-austan',
  SSA   : 'Suð-suð-austan',
  S     : 'Sunnan',
  SSV   : 'Suð-suð-vestan',
  SV    : 'Suð-vestan',
  VSV   : 'Vest-suð-vestan',
  V     : 'Vestan',
  VNV   : 'Vest-norð-vestan',
  NV    : 'Norð-vestan',
  NNV   : 'Norð-norð-vestan'
}

/*
  Object with all the Wind directions availible from Vedur.is in icelandic coverted to en lowercase
  Key is the value coming from the Vedur.is forecast
  Value is the direction in english in lowercase.
*/
var getWindDirectionToEn = {
  Logn  : '',
  N     : 'n',
  NNA   : 'nne',
  ANA   : 'ene',
  A     : 'e',
  ASA   : 'ese',
  SA    : 'se',
  SSA   : 'sse',
  S     : 's',
  SSV   : 'ssw',
  SV    : 'sw',
  VSV   : 'wsw',
  V     : 'w',
  VNV   : 'wnw',
  NV    : 'nw',
  NNV   : 'nnw'
}

/*
  Stations I want to be active at the start.
*/
var activeStations = [
  422, 1
]

/*
  I wrap my ajax call with in a function to be able to call it when ever I want, and so able to call it multiple time on the same page load without
  copy/paste code, easier to maintain if no code is copied.
  
  I only want one parameter which I have stations and expect it to be a string that is comma seperated with the station id's
*/
var getWeather = function(reqStations) {
  if (reqStations != '') { // I wont make the Ajax call is there are no stations to request.
    $.ajax({ // Use the Ajax function from Jquery, which accepts a object with some properties.
      'url': 'https://apis.is/weather/forecasts/is', // Url to send the request to.
      'type': 'GET', // What kind of request it is, possible, GET, POST, HEAD, PUT - Not something you need to think about now, since you only use GET for now.
      'dataType': 'json', // What type of data do you expect to get from the server.
      'data': {'stations': reqStations}, // Query parameters that are sent with the request, IE: ?stations=422,1
      'success': function(response) { // Function that is called if the request was a success and the server responded with in the time limit. response parameter in the function is the response that the server sent back to you.
        var res = response.results; // save the results array in a variable for easy access later on.
        var dateNow = new Date(); // New date that will be set to the time each request is returned to the browser.
        var stations = $('.stations'); // Select an element in the html with the class "stations"
        stations.empty(); // Clear all html inside the .stations html tag
        stations.append('<div class="owl-carousel"></div>'); // Add a div with the given attributes as a child of the .stations html tag.
        stations.show(); // show the .stations html tag if it was hidden.
        $('.error').hide(); // Hide the .error html tag if it is visible.
        var html = stations.find('.owl-carousel'); // finding a html tag with the given class with in the .stations tag and assigning that to the html variable.
        for(var i = 0; i < res.length; i++) { // For loop through all of the stations that are returned to me, res is the results array from the response.
          var station = res[i]; // Assign the current station I am looping through at each given loop.
          var $station = $('<div class="station"></div>'); // Create an div tag with the given attrinbutes and storing it in the $station variable.
          $station.append('<h3>' + station.name + '</h3>'); // Appending an h3 tag with the station name into the $station variable, which will that be the child of the .station div
          var forecasts = station.forecast; // assign forecast array for the given station to a variable for easy access.
          for (var x = 0; x < forecasts.length; x++) { // For loop through all the forcast for the given station.
            var forecast = forecasts[x] // Assign the current forecast to a variable for easy access.
            var foreCastTime = new Date(forecast.ftime); // New date that takes the time from the current forcast
            if (foreCastTime > dateNow) { // Check if the forecast time is higher than the current time, if it is higher then we know that that forecast has not yet occured.
              $station.append('<div class="weather"></div>'); // Append a new div into the $stations html that we made earlier.
              $station.find('.weather') // Find the div that we just appended to the $station
                .append('<div class="dir">Veður spá fyrir: '+ foreCastTime.getUTCDate() + '. ' + getMonth[foreCastTime.getUTCMonth()] + ' ' + foreCastTime.getUTCFullYear() + ' Kl: ' + foreCastTime.getUTCHours() + ':' + (foreCastTime.getMinutes() < 10 ?  '0'+foreCastTime.getMinutes() : foreCastTime.getMinutes()) + '</div>') // Append the time of the forecast to the weather div using built-in functions of the Date object and the getMonth array we made in the start to get the months name.
                .append('<div class="dir">Vindstefna: '+ getWindDirection[forecast.D] +' átt <i class="wi wi-wind wi-towards-' + getWindDirectionToEn[forecast.D] + '"</div>') // Append the wind direction using the getWindDirection array we made in the start, allso add the wind direction icon using the wi and wi-wind classes then we add the wi-towards- and put the wind direction to lowercase using the getWindDirectionToEn Array and add to the end.
                .append('<div class="dir">Vindhraði: '+ forecast.F +' m/s</div>') // Append the wind speed
                .append('<div class="dir">Úrkoma: '+ forecast.R +' mm/klst</div>') // Append the rain forecast
                .append('<div class="dir">Hiti: <span class="t ' + (forecast.T < 0 ? 'cold' : 'hot') + '">'+ forecast.T +'</span> <i class="wi wi-celsius"></i></div>') // Append the heat in celcius and add class based on the tempature.
                .append('<div class="dir">Veðurlýsing: '+ forecast.W +'</div>') // Append the forecast description
                .append('<div class="dir desc wi wi-' + getForecastIcon[forecast.W] + '"></div>'); // Append the forecast Icon with the GetForecastIcon Array made in the start.
              html.append($station); // Append the whole station Html code to the html variable that is the .stations .owl-carousel div.
              break; // Since I did find a forecast that has its time higher than the current time of the browser I know I found a forecast that has not happened and their for I don't need to contine so "break" exits the current for loop.
            }
          }
        }
        /*
          link: https://owlcarousel2.github.io/OwlCarousel2/
          Owl carousel, this is what maks the forcasts movable in a horizontal line and dragable
          I select the item I want in the Html and call the owlCarousel() function that accepts a parametar that is an object and is used to configure the carousel
          to get this to work the div has to have the class .owl-carousel and add the references to the settings.
        */
        $('.stations .owl-carousel').owlCarousel({
          items: 1, // How many items to display
          loop: true, // if it reaches the end, should it loop or stop
          autoplay: true, // Should it scroll automaticly?
          autoplayTimeout: 8000, // Timeout in ms between each autoscroll = 8000 = 8 sec
          autoplaySpeed: 2000, // How long it should take to swap to the next one = 2000 = 2 sec
          dots: true // Should it display the dots below?, ath: I need to css them to show them.
        })
      },
      'error': function() { // Error called if the server did not reply in the given time or returned an error.
        $('.stations').hide(); // Hide the .stations html tag
        $('.error').html('<div class="dir">Villi kom upp og ekki náðist samskipti við vefþjónustu.</div>').show(); // set the Error text into the .error html tag and show it.
      }
    });
  }else { // If there is no stations sent to the function i call the code here
    $('.stations').empty(); // Remove everything from the .stations html tag.
  }
}

/*
  Simple function to call get Weather and update lastFetch variable.
*/
var updateWeather = function() {
  getWeather(globalStations); // call the getWeather function with all the stations that are selected.
  lastFetch = new Date(); // Update the timer to current time.
};

// This code is called as soon as the document is ready.
$('document').ready(function() { // I give it a nameless function to call
  var keys = Object.keys(validStations); // Get all the keys from the validStations Object into and array to iterate over each of them.
  for (var i = 0; i < keys.length; i++) { // For loop to go through all the keys from the validStations Object
    var key = keys[i]; // Get the current key from the keys array.
    if (validStations.hasOwnProperty(key)) { // Check if the validStations Object has the given key.
      var value = validStations[key]; // get the current station Id from the validStation Object
      /*
        Select the select box
        and append an option that has the value of the current station and the name as the key
        (activeStations.indexOf(value) > -1 ? 'selected' : '') I check if the current station is in the activeStations array and if 
        so I add the selected property to it so it will be used from the start
      */
      $('.inputs select').append('<option value="' + value + '" ' + (activeStations.indexOf(value) > -1 ? 'selected' : '') + '>' + key + '</option>');
    }
  }
  /*
    http://davidstutz.de/bootstrap-multiselect/
    js package to make nice mulitselect
    Call the multiselect function  to get a nicer selectbox with mulitselect
  */ 
  $('.inputs select').multiselect({
    includeSelectAllOption: true, // Show the option to select all at once.
    selectAllText: "Vela allar stöðvar" // Text to show for that option.
  });
  
  /*
    SetInterval is a built in javascript function that calls the given function at every "timer" ms interval,
    So it first waits the "timer" time, in this case 1000ms (1sec) * 60 * 1 so 1 minute and then again every "timer" ms 
  *///        Ms      sec   min
  var timer = 1000 *  60 *  1;
  setInterval(function() {        //ms    sec   min
    if (new Date() - lastFetch > (1000 *  60 *  15)) { // Only update if there are more than 15 minutes since I last fetched the weather.
      updateWeather(); // Update the weather.
    }
  }, timer);
  
  /*
    if the selected html tag classes the change event this function is called
    for inputs like select it is when you alter its current state, f.ex. if you select and new option or unselect a currently active option
  */
  $('.inputs select').change(function() {
    globalStations = ''; // Reset the string to empty empty string
    $('.inputs select option').each(function() { // Go over all of the inputs
      var $in = $(this); // Get the current element that I am iterating over and save it in the $in variable
      if ($in.is(':selected')) { // Check if that option is selected if so I call the code below else nothing
        globalStations += $in.val(); // Append the value from the option to the string
        globalStations += ','; // Add a comma at the end
      }
    });
    updateWeather(); // Call the function I made to update the weather.
  });
  $('.inputs select').trigger('change'); // Trigger the change event to get the initial weather stations
});