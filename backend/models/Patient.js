import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    uhid: {
        type: String,
        required: true,
        unique: true
    },
    alternateUhid: {
        type: String
    },
    patientName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    occupation: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    insuranceStatus: {
        type: String,
        enum: ['Insured', 'Not Insured', 'Pending']
    },
    organDonorStatus: {
        type: String,
        enum: ['Yes', 'No']
    }
}, {
    timestamps: true
});

export default mongoose.model('Patient', patientSchema); 