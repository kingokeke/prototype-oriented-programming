/* eslint-disable no-undef */
var DB = require('../db');
var User = require('../user');
var Admin = require('../admin');
var Order = require('../order');

describe('Order constructor', function() {
	it('should exist', function() {
		var order1 = new Order('user-1', ['tea', 'bread', 'butter']);
		expect(order1).toBeDefined();
	});

	it('should increment the order count', function() {
		var initialOrderCount = DB.orderCount;
		var order2 = new Order('user-1', ['tea', 'bread', 'butter']);
		expect(DB.orderCount).toBe(initialOrderCount + 1);
	});

	it('should populate the database', function() {
		var order3 = new Order('user-1', ['tea', 'bread', 'butter']);
		console.log(order3);
		expect(DB.orders).toHaveProperty(order3.orderID);
	});
});
