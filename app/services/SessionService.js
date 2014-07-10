radianDrive.service('SessionService', function () {
	this.create = function (customer) {
		this.id = customer.id;
		this.lastname = customer.lastname;
		this.firstname = customer.lastname;
	};
	this.destroy = function () {
		this.id = 0;
		this.lastname = null;
		this.firstname = null;
	};
	return this;
});