let availableItem1Count = 5;
let availableItem2Count = 2;

// Function to order and fulfill Item1
function orderItem1(orderNumber, quantity) {
    console.log(`Order : ${orderNumber} Item1 - ${quantity} quantity`);
    return new Promise((resolve, reject) => {
        if (quantity == 0 ||
            (availableItem1Count - quantity) < 0){
            reject(`Order : ${orderNumber} Item1 order cannot be processed for ${quantity} quantity.`);
        } else {
            availableItem1Count -= quantity;
            setTimeout(() => {
                resolve(`Order : ${orderNumber} Item1 Order Fulfilled with ${quantity} quantity.`);
            }, 1000);
        }
    });
}

// Function to order and fulfill Item2
function orderItem2(orderNumber, quantity) {
    console.log(`Order : ${orderNumber} Item2 - ${quantity} quantity`);
    return new Promise((resolve, reject) => {
        if (quantity == 0 ||
            (availableItem2Count - quantity) < 0){
            reject(`Order : ${orderNumber} Item2 order cannot be processed for ${quantity} quantity.`);
        } else {
            availableItem2Count -= quantity;
            setTimeout(() => {
                resolve(`Order : ${orderNumber} Item2 Order Fulfilled with ${quantity} quantity.`);
            }, 500);
        }
    });
}

// Order 1 success
let orderNo = 1;
let myFirstOrderReceipt = orderItem1(orderNo, 2);
// Order 2 success
orderNo++;
let secondOrderReceipt = orderItem2(orderNo, 1);

myFirstOrderReceipt.then(msg => {
    console.log('PROCESSED :', msg);
}).catch(errMsg => {
    console.log('CANCELLED :', errMsg);
});

secondOrderReceipt.then(msg => {
    console.log('PROCESSED :', msg);
}).catch(errMsg => {
    console.log('CANCELLED :', errMsg);
});

// Order 3 (2 orders, both success)
orderNo++;
let thirdOrderReceipt = Promise.all([
    orderItem1(orderNo, 1),
    orderItem2(orderNo, 1)
    ]
);
thirdOrderReceipt.then(msg => {
    console.log('PROCESSED :', msg);
}).catch(errMsg => {
    console.log('CANCELLED : one of the order got cancelled.', errMsg);
});

// Order 4 failure
orderNo++;
let fourthOrderReceipt = orderItem1(orderNo, 10);
fourthOrderReceipt.then(msg => {
    console.log('PROCESSED :', msg);
}).catch(errMsg => {
    console.log('CANCELLED :', errMsg);
});

// Order 5 (2 orders, both failure)
orderNo++;
let fifthOrderReceipt = Promise.all([
    orderItem1(orderNo, 10),
    orderItem2(orderNo, 10)
    ]
);
fifthOrderReceipt.then(msg => {
    console.log('PROCESSED :', msg);
}).catch(errMsg => {
    console.log('CANCELLED : one of the order got cancelled.', errMsg);
});

// Order 6 (2 orders, 1 success and 1 failed)
orderNo++;
let sixthOrderReceipt = Promise.all([
    orderItem1(orderNo, 1),
    orderItem2(orderNo, 5)
    ]
);
sixthOrderReceipt.then(msg => {
    console.log('PROCESSED :', msg);
}).catch(errMsg => {
    console.log('CANCELLED : one of the order got cancelled.', errMsg);
});



/*******************************************
 * RESULT


Order : 1 Item1 - 2 quantity
Order : 2 Item2 - 1 quantity
Order : 3 Item1 - 1 quantity
Order : 3 Item2 - 1 quantity
Order : 4 Item1 - 10 quantity
Order : 5 Item1 - 10 quantity
Order : 5 Item2 - 10 quantity
Order : 6 Item1 - 1 quantity
Order : 6 Item2 - 5 quantity
CANCELLED : Order : 4 Item1 order cannot be processed for 10 quantity.
CANCELLED : one of the order got cancelled. Order : 5 Item1 order cannot be processed for 10 quantity.
CANCELLED : one of the order got cancelled. Order : 6 Item2 order cannot be processed for 5 quantity.
PROCESSED : Order : 2 Item2 Order Fulfilled with 1 quantity.
PROCESSED : Order : 1 Item1 Order Fulfilled with 2 quantity.
PROCESSED : [
  'Order : 3 Item1 Order Fulfilled with 1 quantity.',
  'Order : 3 Item2 Order Fulfilled with 1 quantity.'
]

********************************************/
