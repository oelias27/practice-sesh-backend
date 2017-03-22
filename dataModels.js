const model = {
  User: {
    userName: String,
    password: String,
    history: [{}]
  },
  PracticeSession: {
    date: String,
    timeStarted: Number,
    length: Number,
    tasks: [{
      name: String,
      length: Number,
      important: Boolean
    }]
  }
}
