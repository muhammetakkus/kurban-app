import Menu from '../models/Menu.js'

const getAll = async (req,res) => {
   try {
        const menus = await Menu.find().sort('menu_order');
        res.status(200).json(menus);
   } catch (error) {
        console.log(error);
        res.status(500).send(error);
   }
}

export {getAll}