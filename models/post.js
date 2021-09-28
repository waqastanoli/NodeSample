'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schema = new Schema( {
    title: { type: String, required: true,required: "title is required"  },
    content: { type: String, required: true ,required: "content is required"    },
    user: { type: Schema.Types.ObjectId, ref: "Users" ,required: "user is required"  },    
  },
  { timestamps: true }
);


module.exports = mongoose.model('Posts', Schema);