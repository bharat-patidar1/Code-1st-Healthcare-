import {User} from '../models/user.model.js'


export const register = async (req , res)=>{
    try {
        const user = await User.find({});
        console.log(user)
        res.send(user)
    } catch (error) {
        res.send(error)
    }
}

export const login = (req , res)=>{
    try {
        
    } catch (error) {
        
    }
}
