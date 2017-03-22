const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  /**
   * User login informtation
   */
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true
  },


  /**
   * History of user's sessions. 
   */
  history: [

    /**
     * Individual sessions.
     * Multiple sessions in a single day are stored
     * under the same document. 
     */
    {
      id: Number,
      date: Number,

      /**
       * Total time spent in seconds
       */
      time: Number,

      /**
       * Activities array. Each activity is tracked
       * individually. May implement suggestion/autocomplete
       * in the future.
       */
      activities: [
        {
          id: Number,
          details: String,
          timerOn: Boolean,
          time: Number
        }
      ]
    }
  ]
}, {collection: 'users'});

const User = mongoose.model('User', userSchema);

module.exports = User;
