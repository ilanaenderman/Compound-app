'use strict'
// importing necessary modules
const fs = require('fs')  //you can reed const as var

// Helper functions
var roundDecimal = ( number ) => {
	return Math.round(number * 100) / 100
}

var addCommas = ( number ) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

var prettyNumber = (number) =>{
	return addCommas(roundDecimal(number))
}

// read the costumer data json
//=> is same as writing functions

fs.readFile( __dirname + '/customers.json', 'utf-8', ( err, data ) => {
	
	//parse the file to a readable object
	let parsedData = JSON.parse( data )
	for( var i = 0 ; i < parsedData.length ; i++)
	calcCompound( parsedData[i] )
} )

//Old syntacs
//fs.readFile(__dirname + '/costumer.json', 'utf-8', function(err, data){
//} )

//function to calculate compount interst from a customer onbject
var calcCompound = ( customer  ) => {

	//Set end amount prop and  and calculate total duration
	customer.pension.endamount = {
	pessimistic: customer.finances.startcapital,
	average: 	 customer.finances.startcapital,
	optimistic:  customer.finances.startcapital
	}	
	customer.pension.duration = (customer.pension.age - customer.age)

	//Do the interest math
	for (var i = customer.pension.duration - 1; i >= 0; i--) {

	//add monthly spend to all the scenario's
	customer.pension.endamount.pessimistic 	+= ( customer.finances.monthlyadd * 12 )
	customer.pension.endamount.average 		+= ( customer.finances.monthlyadd * 12 )
	customer.pension.endamount.optimistic 	+= ( customer.finances.monthlyadd * 12 )

	//calculate the added interest
	customer.pension.endamount.pessimistic 	*= 	customer.pension.interest.pessimistic
	customer.pension.endamount.average 		*= 	customer.pension.interest.average
	customer.pension.endamount.optimistic 	*= 	customer.pension.interest.optimistic

	}

	//output our data
	console.log( "Welcom " + customer.name + " to our advanced pension planner!")
	console.log( "You are starting with " + customer.finances.startcapital + " and add a monthly amount of " + customer.finances.monthlyadd)
	console.log( "When you retire ate age " + customer.pension.age + " you will have the following:")

	//output calculation stuf
	console.log( "In a pessimistic scenario: €" + 	prettyNumber(customer.pension.endamount.pessimistic) )
	console.log( "In an average scenario: €" 	+ 	prettyNumber(customer.pension.endamount.average) )
	console.log( "In an optimistic scenario: €" 	+ 	prettyNumber(customer.pension.endamount.optimistic) )
	}

module.exports = fs.readFile


