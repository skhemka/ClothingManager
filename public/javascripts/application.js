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
        {
            $("#feels").html("Warm");
            $.ajax({
                url: 'clothes/',
                data: {
                    type: 'shirt',
                    weather: 'warm',
                    status: 'clean',
                },
                success: function(result) {
                    $("#rstable").html(result);
                    console.log("Gets all shirts");
                }
            });
            $.ajax({
                url: 'clothes/',
                data: {
                    type: 'pant',
                    weather: 'warm',
                    status: 'clean',
                },
                success: function(result) {
                    $("#pstable").html(result);
                    console.log("Gets all pants");
                }
            });
            $.ajax({
                url: 'clothes/',
                data: {
                    type: 'jacket',
                    weather: 'warm',
                    status: 'clean',
                },
                success: function(result) {
                    $("#jstable").html(result);
                    console.log("Gets all jackets");
                }
            });

        }
        else 
        {
            $.ajax({
                url: 'clothes/',
                data: {
                    type: 'shirt',
                    weather: 'cold',
                    status: 'clean',
                },
                success: function(result) {
                    $("#rstable").html(result);
                    console.log("Gets all shirts");
                }
            });
            $.ajax({
                url: 'clothes/',
                data: {
                    type: 'pant',
                    weather: 'cold',
                    status: 'clean',
                },
                success: function(result) {
                    $("#pstable").html(result);
                    console.log("Gets all pants");
                }
            });
            $.ajax({
                url: 'clothes/',
                data: {
                    type: 'jacket',
                    weather: 'cold',
                    status: 'clean',
                },
                success: function(result) {
                    $("#jstable").html(result);
                    console.log("Gets all jackets");
                }
            });

            $("#feels").html("Cold");
        }

    }
    else {
        window.alert(response.data.error[0].msg);
    }
}

$(document).ready(function() {
  
    getWeather("Pittsburgh");

});
