let availableItem1Count = 5;
let availableItem2Count = 2;

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

// Order 3 (2 orders success)
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

// Order 5 (2 ordes failure)
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
