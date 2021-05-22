


var temp = $('#temp')
var humidity = $('#humidity')
var uvIndex = $('uv-index')
var list = $('#cities-list')

$('#search').click(function () {
    citySearch = $('#input-search').val();
    console.log(citySearch)
    $('#input-search').val("");

    addCities()
});

function addCities() {
    if (citySearch) {
        console.log(citySearch)
        var cityItem = $('<li>').addClass('city-item').text(citySearch)
        $("#cities-list").append(cityItem)
    }

}