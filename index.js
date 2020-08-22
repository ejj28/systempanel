const express = require('express');
const si = require('systeminformation');
const app = express();
const port = 3000;

app.use(express.static('web'));

app.get("/cpuinfo", (req, res, next) => {
	si.cpu(function (data) {
		res.json({ "mfg": data.manufacturer, "model": data.brand });
	})
});

app.get("/cputemp", (req, res, next) => {
	si.cpuTemperature(function (data) {
		console.log(data.cores)
		res.json({ "temp": data.cores[0]});
	})
});

app.listen(port, () => console.log('systempanel running on port ' + port));