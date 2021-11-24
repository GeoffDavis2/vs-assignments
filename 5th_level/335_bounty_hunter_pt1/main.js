const express = require('express')
const app = express();
const { v4: uuid } = require('uuid');

app.use(express.json());

const bounties = [
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

]
bounties.map(bounty => bounty._id = uuid());

app.get('/bounties', (req, res) => {
    res.json(bounties);
})

app.post('/bounties', (req, res) => {
    const bounty = req.body;
    bounty._id = uuid();
    bounties.push(bounty);
    res
        .status(200)
        .json({
            message: 'Post successfull.',
            data: bounties
        });
})

app.listen(7654, () => {
    console.log('Server is running on port 6789');
});