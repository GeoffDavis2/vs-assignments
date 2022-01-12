db.issues.aggregate([

    {$lookup: {
            from: 'users',
            pipeline: [],
            as: 'userList'
    }},

    { $unset: ['userList.__v', 'userList.password', 'userList.addedDate'] },

    { $set: { addedBy: { $first: { $filter: { input: '$userList', cond: { $eq: ['$addedBy', '$$this._id'] } } } } } },

    { $set: { voteSum: { $sum: "$votes.value" }, voteCt: { $size: '$votes' }, commentCt: { $size: '$comments' } } },

    {$set: {votes: {$map: {
        input: '$votes',
        as: 'obj',
        in: {$let: {
            vars: { userObj: { $first: { $filter: { input: '$userList', cond: { $eq: ["$$this._id", "$$obj.addedBy"] } } } } },
            in: { _id: '$$obj._id', value: '$$obj.value', addedBy: { _id: '$$userObj._id', username: '$$userObj.username' }, addedDate: '$$obj.addedDate' }
    }}}}}},

    {$set: {comments: {$map: {
        input: '$comments',
        as: 'obj',
        in: {$let: {
            vars: { userObj: { $first: { $filter: { input: '$userList', cond: { $eq: ["$$this._id", "$$obj.addedBy"] } } } } },
            in: {
                _id: '$$obj._id', comment: '$$obj.comment',
                addedBy: { _id: '$$userObj._id', username: '$$userObj.username' },
                addedDate: '$$obj.addedDate', voteSum: { $sum: "$$obj.votes.value" }, voteCt: { $size: '$$obj.votes' },
                votes: {$map: {
                    input: '$$obj.votes',
                    as: 'cmtVoteObj',
                    in: {$let: {
                        vars: { userObj: { $first: { $filter: { input: '$userList', cond: { $eq: ["$$this._id", "$$cmtVoteObj.addedBy"] } } } } },
                        in: { _id: '$$cmtVoteObj._id', value: '$$cmtVoteObj.value', addedBy: { _id: '$$userObj._id', username: '$$userObj.username' }, addedDate: '$$cmtVoteObj.addedDate' }
    }}}}}}}}}}},

    { $unset: ['__v', 'userList'] }

])