
var temp = $('#temp')
var humidity = $('#humidity')
var uvIndex = $('uv-index')
var list = $('#cities-list')
var apiKey = `310e39ae7faff36a3a95839e89705b3f`
var apiUrl = "";

$('#search').click(function () {
    citySearch = $('#input-search').val();
    console.log(citySearch)

    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}`;

    $('#input-search').val("");
    
    addCities();
    fuckFetch();
});

$('#clear-button').click(function () {
    $('li').remove()
});

function addCities() {
    if (citySearch) {
        console.log(citySearch)
        var cityItem = $('<li>').addClass('city-item').text(citySearch)
        $("#cities-list").append(cityItem)
    }

}

function fuckFetch () {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => console.log(data))
}