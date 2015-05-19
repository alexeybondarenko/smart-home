
var frisby = require('frisby');
frisby.create('Get list of devices')
.get('http://localhost:3000/devices')
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSONTypes('*', {
    id: Number,
    title: String,
    description: String
})
.toss();