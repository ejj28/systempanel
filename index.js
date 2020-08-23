const express = require('express');
const si = require('systeminformation');
const app = express();
const port = 3000;
const path = require('path');

app.use('/', express.static(path.join(__dirname, "web")));

app.get("/cpuinfo", (req, res, next) => {
	si.cpu(function (data) {
		res.json({ "mfg": data.manufacturer, "model": data.brand });
	})
});

app.get("/cputemp", (req, res, next) => {
	si.cpuTemperature(function (data) {
		res.json({ "temp": data.cores[0]});
	})
});

app.get("/osinfo", (req, res, next) => {
	si.osInfo(function (data) {
		res.json({ "hostname": data.hostname});
	})
});

app.listen(port, () => console.log('systempanel running on port ' + port));