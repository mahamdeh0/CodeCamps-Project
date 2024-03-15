const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true
    },
    course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'course', 
        required: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'cancelled'],
        default: 'active'
    }
}, { timestamps: true });

const SubscriptionModel = mongoose.model('Subscription', subscriptionSchema);
module.exports = { SubscriptionModel };
