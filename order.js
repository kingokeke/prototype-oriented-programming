var Order = (function() {
	var DB = require('./db');
	function Order(String_userID, Array_products) {
		var timestamp = new Date();
		this.userID = String_userID;
		this.orderID = 'order-' + String(DB.orderCount + 1);
		this.date = timestamp.toDateString();
		this.time = timestamp.toLocaleTimeString();
		this.products = Array_products;

		DB.orders[this.orderID] = {
			orderID: this.orderID,
			userID: this.userID,
			date: this.date,
			time: this.time,
			products: this.products,
		};

		DB.orderCount++;
	}

	Order.readAllOrders = function() {
		return DB.orders;
	};

	Order.readOrder = function(String_orderID) {
		if (typeof String_orderID !== 'string') {
			throw new Error('Invalid parameters supplied. Parameter must be a strings only.');
		}
		return {};
	};

	return Order;
})();

module.exports = Order;
