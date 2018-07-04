var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var faqSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  article: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 1
  }
}, { collection: 'knowbase' });

module.exports = mongoose.model('kb', faqSchema);
