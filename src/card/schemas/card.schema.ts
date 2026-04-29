import * as mongoose from 'mongoose';

export const CardSchema = new mongoose.Schema({
  cardNumber: { 
    type: String, 
    required: true 
  },
}, { 
  timestamps: true 
});