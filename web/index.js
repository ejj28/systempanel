var vueCpuInfo = new Vue({
	el: '#vueCpuInfo',
	data: {
		cpuMfg: '',
		cpuModel: '',
		cpuTemp: ''
	}
})

var sidebar = new Vue({
	el: '#navcol',
	data: {
		hostname: 'SystemPanel'
	}
})

function getOSInfo() {
	var Http = new XMLHttpRequest();
	var url = 'http://localhost:3000/osinfo';
	Http.open("GET", url);
	Http.send();

	Http.onreadystatechange = (e) => {
		var osData = JSON.parse(Http.responseText);
		sidebar.header = osData.hostname;
		
	}
}

function getCpuInfo() {
	var Http = new XMLHttpRequest();
	var url = 'http://localhost:3000/cpuinfo';
	Http.open("GET", url);
	Http.send();

	Http.onreadystatechange = (e) => {
		var cpuData = JSON.parse(Http.responseText);
		vueCpuInfo.cpuMfg = cpuData.mfg;
		vueCpuInfo.cpuModel = cpuData.model;
		if (vueCpuInfo.cpuMfg.includes("Intel")) {
			$('#cpuManufacturer').css('color', 'blue');
		} else if (vueCpuInfo.cpuMfg.includes("AMD")) {
			$('#cpuManufacturer').css('color', 'red');
		}
	}
}

function getTemp() {
	var tempRequest = new XMLHttpRequest();
	var tempRequestURL = 'http://localhost:3000/cputemp';
	tempRequest.open("GET", tempRequestURL);
	tempRequest.send();

	tempRequest.onreadystatechange = (e) => {
		var cpuTemp = JSON.parse(tempRequest.responseText);
		vueCpuInfo.cpuTemp = cpuTemp.temp;
	}
}

getOSInfo();
getCpuInfo();
getTemp();