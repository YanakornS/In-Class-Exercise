class Customer {
    orders = [];
    constructor(name, addres) {
        this.name = name;
        this.addres = addres;
    }
    addOrder(order) {
        this.orders.push(order);
    }
}
//let Customer1 = new Customer("Oke", "111/64");
//console.log(Customer1.name);
//console.log(Customer1.addres);

class Order {
    Payment = null;
    orderDetails = [];
    constructor(date, status) {
        this.date = date;
        this.status = status;
    }

    calcSubTotal() {
        for (let i = 0 ; i<this.orderDetails.length; i++) {
            subTotal += this.orderDetails[i].subTotal();
        }
        return subTotal;
      //return this.orderDetails.reduce(
       // (total, orderDetail) => total + orderDetail.subTotal() ,0);
    }

    calcTax() {
        let tax = 0;
        for (let i = 0; i<this.orderDetails.length; i++ ){
            tax += this.orderDetails[i].calcTax();
        }
        return tax;
    }

    calcTotal() {
        return this.calcSubTotal() + this.calcTax();
    }

    calcTotalWeight() {
        let weight = 0;
        for (let i = 0; i<this.orderDetails.length; i++ ){
            weight += this.orderDetails[i].calcTotalWeight();
        }
        return weight;
    }
    
    addPayment(Payment) {
        this.Payment = Payment;
    }
    addOrderDetail(orderDetail) {
       this.orderDetails.push(orderDetail);
    }
}
//let order1 = new Order("30/12/2566");
//console.log(order1);

class OrderDetail {
    item = null;
    constructor(quantity, taxStatus) {
        this.quantity = quantity;
        this.taxStatus = taxStatus;
    }

    calcSubTotal() {
        return this.item.getPriceForQuantity(this.quantity)+this.calcTax();
    }

    calcSubWeight() {
        return this.item.shippingWeight;
    }

    calcTax() {
        return this.item.getTax(this.taxStatus);
    }
    addItem(item) {
        this.item = item;
    }
}

//let orderDetail1 = new OrderDetail(4, "Taxable7%");
//console.log(orderDetail1)

class Item {
    inStock = true;


    constructor(shippingWeight, description, price) {
        this.shippingWeight = shippingWeight;
        this.description = description;
        this.price = price;
    }
    setInStock(status){
        this.inStock = status;
    }

    getPriceForQuantity(quantity) {
        return this.price * quantity
    }

    getTax(taxStatus) {
        if (taxStatus === "Tax included"){
            return 0;
            }
            else {
                return this.price *0.07;
   
               }
       
    }
  

    inStock() {
        console.log("inStock");
    }
}

//let item1 = new Item(10, "Good", 150);
//console.log(item1);

class Payment {
    constructor(amount) {
        this.amount = amount;
    }
}

class Cash extends Payment {
    constructor(amount, cashTendered) {
        super(amount);
        this.cashTendered = cashTendered;
    }
}

class Check extends Payment {
    constructor(amount, name, bankID) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }

    authorized() {
        console.log("authorized");
    }
}

//let check1 = new Check(30000, "หัวหน้า", "30000");
//console.log(check1);


class Credit extends Payment {
    constructor(amount, number, type, expDate) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }

    authorized() {
        console.log("authorized");
    }
}

//let credit1 = new Credit("SSS+", 1, "2", "30-12-2566");
//console.log(credit1);

const main = () => {
    let customer1 = new Customer("Yanakorn", "111/64");
    let customer2 = new Customer("Chayatip", "Nakonpathon");
    //console.log(Customer1);
    //ProductItem
    const item1 = new Item (0.3,"ออลอินวันบักเก็ต",299);
    const item2 = new Item (0.1,"ป๊อบบอมบ์แซ่บ",39);
    const item3 = new Item (0.2,"เดอะบอกซ์ออลสตาร์",159);
    const item4 = new Item (0.3,"เดอะบอกซ์ซิคเนเจอร์",169);
    const item5 = new Item (0.5,"ชุดข้าวไก่กรอบแกงเขียวหวานเคเอฟซีร์",109);

    //create order 
    const order1 = new Order ("08/01/2567","In proocess");
    const order2 = new Order ("08/01/2567","In proocess");
    const order3 = new Order ("10/01/2567","In proocess");



    //aad order to a customer
    customer1.addOrder(order1);
    customer1.addOrder(order2);
    customer2.addOrder(order3);
    //console.log(order1);

    //create order detail
    const orderDetail1 = new OrderDetail(5,"tax included");
    orderDetail1.addItem(item1);
    const orderDetail2 = new OrderDetail(2,"tax included");
    orderDetail2.addItem(item5);
    const orderDetail3 = new OrderDetail(4,"tax included");
    orderDetail3.addItem(item2);
    const orderDetail4 = new OrderDetail(3,"tax included");
    orderDetail4.addItem(item3);
    const orderDetail5 = new OrderDetail(3,"tax included");
    orderDetail5.addItem(item4);
    const orderDetail6 = new OrderDetail(3,"tax included");
    orderDetail6.addItem(item1);


    //add order detail to an order 
    order1.addOrderDetail(orderDetail1);
    order1.addOrderDetail(orderDetail2);
    order2.addOrderDetail(orderDetail3); 
    order2.addOrderDetail(orderDetail4); 
    order3.addOrderDetail(orderDetail5);
    order3.addOrderDetail(orderDetail6);
    //console.log(orderDetail)
    //console.log(Customer1.Order[0]);

   // console.log(customer1);
    console.log("ชื่อ : " + customer1.name);
    console.log("จำนวนคำสั่งซื้อ : " + customer1.orders.length);
    for (let i = 0; i < customer1.orders.length; i++) {
        console.log("คำสั่งซื้อที่ :"+(i + 1));
        let total = 0;
        //console.log( Customer1.Order[i].orderDetails);
        for (let k = 0; k < customer1.orders[i].orderDetails.length; k++) {
            const item = customer1.orders[i].orderDetails[k].item;
            const quantity = customer1.orders[i].orderDetails[k].quantity;
            const subTotal = quantity * item.price;
            total += subTotal;
            console.log(
                "ลำดับที่" +
                ( k + 1) +
                ""+
                item.description+
                "จำนวน"+
                quantity +
                "รายการ" + 
                "ราคา" +
                subTotal +
                "บาท"
            );
        }
        console.log("รวมทั้งหมด" + total + "บาท");
    }




    //console.log(customer2);
    console.log("ชื่อ : " + customer2.name);
    console.log("จำนวนคำสั่งซื้อ : " + customer2.orders.length);
    for (let i = 0; i < customer2.orders.length; i++) {
        console.log("คำสั่งซื้อที่ :"+(i + 1));
        let total = 0;
        //console.log( Customer1.Order[i].orderDetails);
        for (let k = 0; k < customer2.orders[i].orderDetails.length; k++) {
            const item = customer2.orders[i].orderDetails[k].item;
            const quantity = customer2.orders[i].orderDetails[k].quantity;
            const subTotal = quantity * item.price;
            total += subTotal;
            console.log(
                "ลำดับที่" +
                ( k + 1) +
                ""+
                item.description+
                "จำนวน"+
                quantity +
                "รายการ" + 
                "ราคา" +
                subTotal +
                "บาท"
            );
        }
        console.log("รวมทั้งหมด" + total + "บาท");
    }

    
    
    
    //Name : Yanakorn Srinuan 
    //Order number :1
    //ลำดับที่ 1 ออลอินวันบักเก็ต จำนวน 5 รายการราคา  1495
    //ลำดับที่ 2 ชุดข้าวไก่กรอบแกงเขียวหวาน เคเอฟซีร์ จำนวน 2 รายการ 218
    //3 รวมทั้งหมด 1731 บาท


};

main();