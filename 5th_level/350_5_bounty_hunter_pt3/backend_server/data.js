const { v4: uuid } = require("uuid");

const data = [
    {
        FirstName: 'Geoff',
        LastName: 'Davis',
        Living: true,
        BountyAmount: 50,
        Type: 'Jedi'
    },
    {
        FirstName: 'John',
        LastName: 'Doe',
        Living: true,
        BountyAmount: 500,
        Type: 'Sith'
    },
    {
        FirstName: 'Spike',
        LastName: 'Jones',
        Living: true,
        BountyAmount: 500,
        Type: 'Jedi'
    },
    {
        FirstName: 'Luke',
        LastName: 'Skywalker',
        Living: false,
        BountyAmount: 697,
        Type: 'Jedi'
    },
    {
        FirstName: 'Darth',
        LastName: 'Vader',
        Living: false,
        BountyAmount: 0,
        Type: 'Sith'
    },
    {
        FirstName: 'Leia',
        LastName: 'Organa',
        Living: true,
        BountyAmount: 550,
        Type: 'Jedi'
    },
    {
        FirstName: 'Obi-Wan',
        LastName: 'Kenobi',
        Living: false,
        BountyAmount: 5000,
        Type: 'Jedi'
    },
    {
        FirstName: 'Biggs',
        LastName: 'Darklighter',
        Living: true,
        BountyAmount: 5010,
        Type: 'Sith'
    }
];

module.exports.data = data.map(obj => ({ _id: uuid(), ...obj }));