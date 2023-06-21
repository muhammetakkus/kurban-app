import User from '../models/User.js'
import Buyukbas from '../models/Buyukbas.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

// user objesinden password veya istenilen ögeler çıkarılmış şekilde return et
const userData = (user) => {
    if(user.length > 1) {
        const users = user.map(item => {
            return {
                id: item._id,
                email: item.email,
                createdAt: item.createdAt,
                token: generateToken(item._id)
            }
        })
        return users;
    } 
    // tek bir obj ise
    return {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        token: generateToken(user._id)
    }     
}

const login = async (req,res) =>{
    try {
        const {email, password} = req.body
    
        const user = await User.findOne({email});

        

        if(user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json(userData(user))
        } else {
            res.status(200).json({error: 'Girilen bilgiler ile eşleşen bir kullanıcı bulunamadı.'})
        }
    } catch (error) {
        //res.json(error);
    }
}

// import validationResult from "express-validator"
const register = async (req,res) => {
    // const errors = validationResult(req);
    /*
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    */
    try {
        //req.body.password = bcrypt.hash(req.body.password)

        const findUser = await User.findOne({email: req.body.email})
        
        if(findUser) {
            res.status(200).json({error: 'Bu email adresi ile kayıtlı bir kullanıcı bulunmakta.'});
        }
        
        const salt = await bcrypt.genSalt(10)
        req.body.password =  await bcrypt.hash(req.body.password, salt)

        const user = await User.create(req.body);
        res.status(200).json({
            id: user._id,
            email: user.email,
            token: generateToken(user._id)
        });

        /*const user = new User(req.body);
        const savedUser = await user.save()
        res.status(200).json(savedUser)*/

    } catch (error) {
        //console.log(error);
        //res.status(500).send(error);
    }
}
const users = asyncHandler( async (req,res) => {
    const users = await User.find();
    return res.status(200).json(userData(users));
})

const findByEmail = async (req, res) => {
    try {
        User.find({ email: req.body.email },(err, data) => {
            if (err){
                console.log(err);
                return err;
            }
            else{
                return data;
            }
          });
    } catch (error) {
        
    }
}

const getKurbanInfo = asyncHandler( async (req,res) => {
    const buyukbas = await Buyukbas.find({uniq_kurban_code: req.params.kurban_code}).populate("hisse").populate("process")
    return res.status(200).json(buyukbas);
})

// using inside this module
const findOne = async (filter) => {
    let doc = await Student.findOne(filter);
    return doc;
}

const find = async (req,res) => {
   try {
        //if(mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No item wit that id')
        const user = await User.findById({ _id: req.params.id }); // routerda /user/:id şeklinde id parametresi var
        res.status(200).json(user);
   } catch (error) {
        console.log(error);
        res.status(500).send(error);
   }
}
const update = async (req,res) =>{
    
    const filter = { name: 'Alex' };
    const update = { age: '19' };
    let doc = await User.findOneAndUpdate(filter, update);

    /*
    // name', Deven olan objedeki hobbies arrayına yeni değer push etmek
    // normalde updateOne kullanımı Model.updateOne({find: value}, {change: value})
    User.updateOne(
        { name: "Deven" },
        { $push: { hobbies : [ "Writing"] } },
        (err, result) => {
          if (err) res.send(err);
          else res.send(result);
        }
    );
    */
}
const _delete = async (req,res) =>{
    const result = await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json(result);
}

const generateToken = (id) => {
    return jwt.sign({id}, "kurbanapp", {expiresIn: '30d'})
}

export {login, users, register, find, update, getKurbanInfo, _delete}