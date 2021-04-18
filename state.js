var Order = /** @class */ (function () {
    function Order() {
        this.cancelledOrderState = new CancelledOrderState(this);
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderBeingPrepared = new OrderBeingPrepared(this);
        this.orderShippedState = new OrderShippedState(this);
        this.setState(this.paymentPendingState);
    }
    Order.prototype.setState = function (state) {
        this.currnetState = state;
    };
    Order.prototype.getState = function () {
        return this.currnetState;
    };
    return Order;
}());
var CancelledOrderState = /** @class */ (function () {
    function CancelledOrderState(order) {
        this.order = order;
    }
    CancelledOrderState.prototype.cancelOrder = function () {
        console.log("This order is already cancelled.");
        this.order.setState(this.order.cancelledOrderState);
    };
    CancelledOrderState.prototype.verifyPayment = function () {
        console.log("The order is cancelled, you cannot pay anymore.");
    };
    CancelledOrderState.prototype.shipOrder = function () {
        console.log("The order is cancelled, you cannot ship it anymore.");
    };
    return CancelledOrderState;
}());
var PaymentPendingState = /** @class */ (function () {
    function PaymentPendingState(order) {
        this.order = order;
    }
    PaymentPendingState.prototype.cancelOrder = function () {
        console.log("Cancelling your unpaid order...");
        this.order.setState(this.order.cancelledOrderState);
    };
    PaymentPendingState.prototype.verifyPayment = function () {
        console.log("Payment verified! Shipping soon.");
        this.order.setState(this.order.paymentPendingState);
    };
    PaymentPendingState.prototype.shipOrder = function () {
        console.log("Cannot ship order when payment is pending.");
    };
    return PaymentPendingState;
}());
var OrderBeingPrepared = /** @class */ (function () {
    function OrderBeingPrepared(order) {
        this.order = order;
    }
    OrderBeingPrepared.prototype.cancelOrder = function () {
        console.log("Cancelling your order... You will be refunded.");
        this.order.setState(this.order.cancelledOrderState);
    };
    OrderBeingPrepared.prototype.verifyPayment = function () {
        console.log("Payment is already verified.");
    };
    OrderBeingPrepared.prototype.shipOrder = function () {
        console.log("Shipping your order now...");
        this.order.setState(this.order.orderShippedState);
    };
    return OrderBeingPrepared;
}());
var OrderShippedState = /** @class */ (function () {
    function OrderShippedState(order) {
        this.order = order;
    }
    OrderShippedState.prototype.cancelOrder = function () {
        console.log("You cannot cancel an order that has been shipped.");
    };
    OrderShippedState.prototype.verifyPayment = function () {
        console.log("Payment is already verified.");
    };
    OrderShippedState.prototype.shipOrder = function () {
        console.log("Order is already shipped.");
    };
    return OrderShippedState;
}());
var order = new Order();
order.getState().cancelOrder();
console.log('Order state: ' + order.getState().constructor.name);
