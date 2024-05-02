const order =require("../models/orderschema");

exports.createorder=async(req,res)=>{
    try {
        const { orderid, orderitems, totalprice } = req.body;
        const neworder = new order({orderid, orderitems, totalprice });
        await neworder.save();
        res.status(201).json({ message: 'Order created successfully', order: neworder });
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getorderhistory=async(req,res)=>{
    try {
        const { customerid } = req.params;
        const orders = await order.find({ customer : customerid }).populate('orderItems.item');
        res.status(200).json(orders);
    } 
    catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateorder=async(req,res)=>{
    try {
        const { orderid } = req.params;
        const { orderitems, totalprice } = req.body;
        let order = await order.findById(orderid);
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
        order.orderitems = orderitems || order.orderitems;
        order.totalprice = totalprice || order.totalprice;
        await order.save();
        res.status(200).json({ message: 'Order updated successfully', order });
    } 
    catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.cancelorder=async(req,res)=>{
    try {
        const { orderid } = req.params;
        const order = await order.findByIdAndDelete(orderid);
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order cancelled successfully' });
    } 
    catch (error) {
        console.error('Error cancelling order:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    
};


module.exports = ordercontroller;

