'use strict'
// importing necessary modules
const fs = require('fs')  //you can reed const as var

// read the costumer data json
//=> is same as writing functions

fs.readFile( __dirname + '/costumer.json', 'utf-8', ( err, data ) => {
	//parse the file to a readable object
	let parsedData = JSON.parse( data )
	calcCompound( parsedData )
	
} )

//Old syntacs
//fs.readFile(__dirname + '/costumer.json', 'utf-8', function(err, data){
//} )

//function to calculate compount interst from a customer onbject
var calcCompound = ( customer  ) => {

	//Set end amount prop and  and calculate total duration
	customer.pension.endamount = {
		pessimistic: customer.finances.startcapital,
		average: customer.finances.startcapital,
		optimistic: customer.finances.startcapital
	}	
	customer.pension.duration = (customer.pension.age - customer.age)

	//Do the interest math
	for (var i = customer.pension.duration - 1; i >= 0; i--) {
		//add monthly spend to all the scenario's
		customer.pension.endamount.pessimistic += ( customer.finances.monthlyadd * 12 )
		customer.pension.endamount.average += ( customer.finances.monthlyadd * 12 )
		customer.pension.endamount.optimistic += ( customer.finances.monthlyadd * 12 )

		//calculate the added interest
		customer.pension.endamount.pessimistic *= customer.pension.interest.pessimistic
		customer.pension.endamount.average *= customer.pension.interest.average
		customer.pension.endamount.optimistic *= customer.pension.interest.optimistic

	}

	//output our data
	console.log( "welcom " + customer.name + " to our advanced pension planner!")
	console.log( "You are starting with " + customer.finances.startcapital + " and add a monthly amount of " + customer.finances.monthlyadd)
	console.log( "When you retire ate age " + customer.pension.age + " you will have the following:")

	//output calculation stuf
	console.log( "In a pessimistic scenario: $" + customer.pension.endamount.pessimistic)
	console.log( "In an average scenario: $" + customer.pension.endamount.average)
	console.log( "In a optimistic scenario: $" + customer.pension.endamount.optimistic)
}
