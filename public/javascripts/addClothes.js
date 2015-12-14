//derived from my HW 5
//makes an jsonp ajax request to world weather online api
//it gets the weather for the city that the user enters
//afterwhich it calls displayweather to display this information on the screen
function getWeather(city){
	$.ajax({
 		url:"http://api.worldweatheronline.com/free/v2/weather.ashx",
 		data: {
 			q : city, 
 			num_of_days : "1",
 			key : "3609ab91b567ec4b2781bdda0826a",
 			format: "json",
 			callback : "displayWeather"
 			},
        jsonp: false,						
        dataType: "jsonp",			
		crossDomain: true
    } );
	return false;
}

//adds the weather information received from the api and adds it to the weather data table
function displayWeather(response) {
    if(typeof response.data.error == "undefined"){
        var t = response.data.current_condition[0].temp_F;
        $("#weather").html(t);
        if(t>65)
            $("#feels").html("Warm");
        else
            $("#feels").html("Cold");
    }
    else {
        window.alert(response.data.error[0].msg);
    }
}

//derived from HW12
function addClothes() {
    var name = $('#new input')[0].value;
    var color = $('#new input')[1].value;
    var type = $('#new input')[2].value;
    var weather = $('#new input')[3].value;
    var status = $('#new input')[4].value;
    $.ajax({
        url: 'clothes',
        data: {
            name: name,
            color: color,
            type: type,
            weather: weather,
            status: status
        },
        type: 'PUT',
        success:function(result) {
            console.log("Successfully added clothing item");
        }   
    });
    event.preventDefault();
}

$(document).ready(function() {
    
    getWeather("Pittsburgh");
    $('#new').submit(addClothes);

});
