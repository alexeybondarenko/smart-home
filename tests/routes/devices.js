
var frisby = require('frisby');
frisby.create('Get list of devices')
.get('https://localhost:3000/api/devices');