interface State {
  order: Order;

  cancelOrder();
  verifyPayment();
  shipOrder();
}

class Order {
  public currnetState: State;

  public cancelledOrderState: State;
  public paymentPendingState: State;
  public orderBeingPrepared: State;
  public orderShippedState: State;

  constructor() {
    this.cancelledOrderState = new CancelledOrderState(this);
    this.paymentPendingState = new PaymentPendingState(this);
    this.orderBeingPrepared = new OrderBeingPrepared(this);
    this.orderShippedState = new OrderShippedState(this);

    this.setState(this.paymentPendingState);
  }

  setState(state: State) {
    this.currnetState = state;
  }
  getState() {
    return this.currnetState;
  }
}

class CancelledOrderState implements State {
  order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  cancelOrder() {
    console.log("This order is already cancelled.");
    this.order.setState(this.order.cancelledOrderState);
  }
  public verifyPayment() {
    console.log("The order is cancelled, you cannot pay anymore.");
  }

  public shipOrder() {
    console.log("The order is cancelled, you cannot ship it anymore.");
  }
}

class PaymentPendingState implements State {
  order: Order;
  constructor(order: Order) {
    this.order = order;
  }
  cancelOrder() {
    console.log("Cancelling your unpaid order...");
    this.order.setState(this.order.cancelledOrderState);
  }
  verifyPayment() {
    console.log("Payment verified! Shipping soon.");
    this.order.setState(this.order.paymentPendingState);
  }
  shipOrder() {
    console.log("Cannot ship order when payment is pending.");
  }
}
class OrderBeingPrepared implements State {
  order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  cancelOrder() {
    console.log("Cancelling your order... You will be refunded.");
    this.order.setState(this.order.cancelledOrderState);
  }
  verifyPayment() {
    console.log("Payment is already verified.");
  }
  shipOrder() {
    console.log("Shipping your order now...");
    this.order.setState(this.order.orderShippedState);
  }
}

class OrderShippedState implements State {
  order: Order;

  constructor(order: Order) {
    this.order = order;
  }

  cancelOrder() {
    console.log("You cannot cancel an order that has been shipped.");
  }
  verifyPayment() {
    console.log("Payment is already verified.");
  }
  shipOrder() {
    console.log("Order is already shipped.");
  }
}


let order = new Order();
order.getState().cancelOrder();

console.log('Order state: '+(<any>order.getState()).constructor.name);