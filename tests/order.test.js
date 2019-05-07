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

	it('should save the order details to database', function() {
		var order3 = new Order('user-1', ['tea', 'bread', 'butter']);
		expect(DB.orders).toHaveProperty(order3.orderID);
	});

	it('should persist an object with userID, orderID, products, date and time as keys', function() {
		var order4 = new Order('user-1', ['tea', 'bread', 'butter']);
		expect(DB.orders[order4.orderID]).toHaveProperty('orderID');
		expect(DB.orders[order4.orderID]).toHaveProperty('userID');
		expect(DB.orders[order4.orderID]).toHaveProperty('time');
		expect(DB.orders[order4.orderID]).toHaveProperty('date');
		expect(DB.orders[order4.orderID]).toHaveProperty('products');
	});
});

describe('Order.readAllOrders', function() {
	it('should exist', function() {
		expect(Order).toHaveProperty('readAllOrders');
	});

	it('should return an answer that is not undefined', function() {
		expect(Order.readAllOrders()).toBeDefined();
	});

	it('should return an object containing all orders in the DB', function() {
		expect(Order.readAllOrders()).toEqual(DB.orders);
	});
});

describe('Order.readOrder', function() {
	it('should exist', function() {
		expect(Order).toHaveProperty('readOrder');
	});

	it('should return an answer that is not undefined', function() {
		expect(Order.readOrder('order-1')).toBeDefined();
	});
});
