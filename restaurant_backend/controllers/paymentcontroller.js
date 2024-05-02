const payment =require("../models/paymentschema");

exports.processpayment=async(req,res)=>{
    try {
        const { orderid, paymentmethod, amount } = req.body;
        const newpayment = new payment({ order: orderid, paymentmethod, amount });
        await newpayment.save();
        res.status(201).json({ message: 'Payment processed successfully', payment: newpayment });
    } 
    catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getpaymenthistory=async(req,res)=>{
    try {
        const { orderid } = req.params;
        const payments = await payment.find({ order: orderid });
        res.status(200).json(payments);
    } 
    catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

module.exports = paymentcontroller;