function geocode()
{
	var lat1, lat2, lng1, lng2,formatted_address1,formatted_address2;
	var url="https://maps.googleapis.com/maps/api/geocode/json";			
    var key="&key=AIzaSyDYeGB8aNTsLUucorKexIZ9PNrIbH5HD3I";
	var city1=document.getElementById('city1').value;
	var city2=document.getElementById('city2').value;

function showResult(citynumber, result, color){
	result = JSON.parse(result);
	result = result.results[0];
	document.getElementById('error'+citynumber).innerHTML = " ";
	document.getElementById('missing').innerHTML = " ";
	if(result && result.formatted_address){
		document.getElementById('FormattedAddress'+citynumber).innerHTML = "City " +citynumber+ ": " + "<span style=\"color:" +color+ "\";>" + result.formatted_address + "</span>" + "<br/>" + "Latitude: " +"<span style=\"color:" +color+ "\";>"+result.geometry.location.lat+ "</span>"+"<br/>" +"Longitude: " + "<span style=\"color:" +color+ "\";>" + result.geometry.location.lng + "</span>"+"<br/><br/>";
		if(citynumber===1){
			lat1=result.geometry.location.lat;
			lng1=result.geometry.location.lng;
			formatted_address1=result.formatted_address;
		}
		if(citynumber===2){
			lat2=result.geometry.location.lat;
			lng2=result.geometry.location.lng;
			formatted_address2=result.formatted_address;
		}
	
		showDistance(lat1,lng1,lat1,lng2,formatted_address1,formatted_address2);
	}
	else{
		showError(citynumber);
	}
}

function showMissing(citynumber){
	document.getElementById('missing').innerHTML = "Please enter "+"<span style=\"color:red\";> both </span>"+ "the cities";
	document.getElementById('FormattedAddress'+citynumber).innerHTML = " ";
	document.getElementById('distance').innerHTML = " ";
	document.getElementById('error1').innerHTML = " ";
	document.getElementById('error2').innerHTML = " ";

}

function showError(citynumber){
	document.getElementById('FormattedAddress'+citynumber).innerHTML = " ";
	document.getElementById('error'+citynumber).innerHTML = "City " +citynumber+"<span style=\"color:red\";> does not </span>"+ "exist"
	document.getElementById('distance').innerHTML = " ";
	document.getElementById('missing').innerHTML = " ";
}

function showDistance(lat1,lng1,lat1,lng2,formatted_address1,formatted_address2){
	var R= 6371;
	var dlng=(Math.abs(lng2-lng1))* Math.PI / 180; 	
	var dlat=(Math.abs(lat2-lat1))* Math.PI / 180;
	var a=(Math.sin(dlat/2))*(Math.sin(dlat/2)) + Math.cos(lat1* Math.PI / 180)*Math.cos(lat2* Math.PI / 180)* (Math.sin(dlng/2))*(Math.sin(dlng/2));
	var c=2 * Math.atan2(Math.sqrt(a),Math.sqrt(Math.abs(1-a)));
	var d=(R*c).toFixed(2);


	if(formatted_address1 && formatted_address2){
		document.getElementById('distance').innerHTML = "The distance between "+"<span style=\"color:maroon\";>"+formatted_address1 + "</span>"+ " and " +"<span style=\"color:maroon\";>"+formatted_address2 + "</span>"+ " is " + "<span style=\"color:red\";>"+d + "kms."+ "</span>";
	}
}
	
	
function searchCity(city,reqListener){
	if(city){	
		var search = new XMLHttpRequest();
		search.addEventListener("load", reqListener);
		search.open("GET",url+"?address="+city+"&key="+key,true);
		search.send();
		}
	else{
		showMissing(1);
		showMissing(2);
		}
	}   
	
  searchCity(city1,function(){
	 showResult(1,this.response,'blue');
      searchCity(city2,function(){
		showResult(2,this.response,'green');
	
      }) 
  })
}
