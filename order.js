var Order = (function() {
	function Order(String_userID, Array_products) {
		this.userID = String_userID;
		this.products = Array_products;
	}
	return Order;
})();

module.exports = Order;
