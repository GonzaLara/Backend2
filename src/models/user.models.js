import mongoose from "mongoose";
const {Schema} = mongoose;

//El esquema para el usuario
const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] }
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;