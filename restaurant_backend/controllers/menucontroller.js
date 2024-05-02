const menuitem =require("../models/menuschema");

exports.getallmenuitems=async(req,res)=>{
    try {
        const menuitems = await menuitem.find();
        res.status(200).json(menuitems);
      } 
    
    catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

exports.addmenuitems=async(req,res)=>{
    try {
        const { name, description, price } = req.body;
        const newitem = new menuitem({ name, description, price });
        await newitem.save();
        res.status(201).json({ message: 'Menu item added successfully', menuitem: newitem });
    }
    catch (error) {
        console.error('Error adding menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updatemenuitems=async(req,res)=>{
    try {
        const { itemid } = req.params;
        const { name, description, price } = req.body;
        let menuitem = await menuitem.findById(itemid);
        if (!menuitem) {
          return res.status(404).json({ message: 'Menu item not found' });
        }
        menuitem.name = name || menuitem.name;
        menuitem.description = description || menuitem.description;
        menuitem.price = price || menuitem.price;
        await menuitem.save();
        res.status(200).json({ message: 'Menu item updated successfully', menuitem });
      } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

exports.deletemenuitems=async(req,res)=>{
    try {
        const { itemid } = req.params;
        const menuitem = await menuitem.findByIdAndDelete(itemid);
        if (!menuitem) {
          return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

module.exports = menucontroller;