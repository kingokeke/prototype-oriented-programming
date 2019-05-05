/* eslint-disable no-undef */
var DB = require('../db');
var User = require('../user');
var Admin = require('../admin');
var Order = require('../order');

describe('Order constructor', function() {
	it('should exist', function() {
		expect(new Order('user-1', ['tea', 'bread', 'butter'])).toBeDefined();
	});
	it('should increment the order count', function() {
		var initialOrderCount = DB.orderCount;
		new Order('user-1', ['tea', 'bread', 'butter']);
		expect(DB.orderCount).toBe(initialOrderCount + 1);
	});
});
