
var temp = $('#temp')
var humidity = $('#humidity')
var uvIndex = $('#uv-index')
var list = $('#cities-list')
var wind = $('#wind')
var weatherHeader = $('#weather-header')
var apiKey = `310e39ae7faff36a3a95839e89705b3f`
var apiUrl = "";


$('#search').click(function () {
    
    
    Object.defineProperty(String.prototype, 'capitalize', {
        value: function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        },
        writable: true,
        configurable: true
    });
    citySearch = $('#input-search').val().capitalize();

    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}`;

    $('#input-search').val("");

    addCities();
    weatherFetch();
    $('.forecast-item').remove()
});

$('#input-search').keypress(function (e) {
    var key = e.which;
    if (key == 13) {
        $('#search').click();
        return false;
    }
});

$('#clear-button').click(function () {
    $('li').remove()
});

function addCities() {
    if (citySearch) {
        var cityItem = $('<li>').addClass('city-item').text(citySearch)
        $("#cities-list").append(cityItem)
    }

}

function weatherFetch() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            lat = data.coord.lat;
            lon = data.coord.lon;
            console.log(lon, lat);

            getForecast(lat, lon);
        })
};

function getForecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.current.weather[0].icon);

            var dailyData = data.daily;
            console.log(dailyData)
            
            for (i = 1; i < 6; i++) {

                storeSet = localStorage.setItem("key" + i, JSON.stringify(dailyData[i]))

                $('#forecast-div').append($('<div>',
                    {
                        id: "forecast-" + i,
                        "class": 'forecast-item col-2 card'
                    }).clone());
            }

            $('.forecast-item').each(function () {
                var forecastItem = parseInt($(this).attr("id").split("-")[1])
                getStore = JSON.parse(localStorage.getItem("key" + forecastItem))

                var newDate = getStore.dt;
                var date = new Date(newDate * 1000);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                var weatherIcon = getStore.weather[0].icon;
                var iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

                $(this).append($('<span>', { id: "date", "class": "five-day-item"}).text(`Date ${month}/${day}/${year}`))
                $(this).append($('<img>', { id: "icon", src: `${iconUrl}`, "class": "five-day-item"}))
                $(this).append($('<span>', { id: "temp", "class": "five-day-item" }).text(`Temp ${getStore.temp.day}°F`))
                $(this).append($('<span>', { id: "wind", "class": "five-day-item" }).text(`Wind ${getStore.wind_speed} MPH`))
                $(this).append($('<span>', { id: "humidity", "class": "five-day-item" }).text(`Humidiy ${getStore.humidity}%`))

            })

            var currentDate = data.current.dt;

            var date = new Date(currentDate * 1000);
            console.log(date);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            var weatherIcon = data.current.weather[0].icon;
            var iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

            $("#weather-header").text("");
            $("#weather-header").append(`Current weather for ${citySearch} ${month}/${day}/${year}`);
            $("#icon").attr("src", iconUrl);
            temp.text(`Temp: ${Math.floor(data.current.temp)}°F`);
            wind.text(`Wind Speed: ${(data.current.wind_speed)} MPH`);
            humidity.text(`Humidity: ${Math.floor(data.current.humidity)}%`);
            uvIndex.text(`UV Index: ${data.current.uvi}`)
            uvCheck(data);

        })
};


function uvCheck(data) {
    uvIndex.addClass("badge");

    if (data.current.uvi < 3) {
        uvIndex.removeClass("bg-warning bg-danger");
        uvIndex.addClass("bg-success");
    } else if (data.current.uvi >= 3 && data.current.uvi < 6) {
        uvIndex.removeClass("bg-success bg-danger");
        uvIndex.addClass("bg-warning");
    } else if (data.current.uvi >= 6 && data.current.uvi < 8) {
        uvIndex.removeClass("bg-warning bg-success");
        uvIndex.addClass("bg-danger");
    } else {
        uvIndex.removeClass("bg-warning bg-success");
        uvIndex.addClass("bg-danger");
    }
}
