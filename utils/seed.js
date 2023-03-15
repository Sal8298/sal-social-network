const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.once('open', async () => {
    console.log('connected');

    let users = [ 
        {
        username: "SalPrime",
        email: "SalPrime@email.com"
    },
    {
        username: "SalTheSecond",
        email: "SalTheSecond@email.com"
    },
    {
        username: "3PeatSal",
        email: "3PeatSal@email.com",
    },
        
    ];
    
    let thoughts = [ 
        {
        username: "SalPrime",
        thoughtText: "I am the origin!"
    },
    {
        username: "SalTheSecond",
        thoughtText: "I am the improved!"
    },
    {
        username: "3PeatSal",
        thoughtText: "Another 3 and I will be the new GOAT!"
    }
        
    ];
    
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.log('data seeded!')

    await User.deleteMany({});
    await Thought.deleteMany({});

    process.exit(0);
});