import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username to move forward'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email to move forward']
    },
    password: {
        type: String,
        required: [true, 'Please provide password to move forward']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String,
    },
    isVerifiedToken: {
        type: String,
    },
    forgotPasswordExpiry: {
        type: Date
    },
    isVerifiedExpiry: {
        type: Date
    }
})

const users = mongoose.models.users || mongoose.model('users', userSchema)

export default users;