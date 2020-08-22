var app = new Vue({
	el: '#app',
	data: {
		cpuMfg: '',
		cpuModel: '',
		cpuTemp: ''
	}
})

const Http = new XMLHttpRequest();
const url = 'http://localhost:3000/cpuinfo';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
	var cpuData = JSON.parse(Http.responseText);
	app.cpuMfg = cpuData.mfg;
	app.cpuModel = cpuData.model;
}

function getTemp() {
	const tempRequest = new XMLHttpRequest();
	const tempRequestURL = 'http://localhost:3000/cputemp';
	tempRequest.open("GET", tempRequestURL);
	tempRequest.send();

	tempRequest.onreadystatechange = (e) => {
		var cpuTemp = JSON.parse(tempRequest.responseText);
		app.cpuTemp = cpuTemp.temp;
	}
}

getTemp();