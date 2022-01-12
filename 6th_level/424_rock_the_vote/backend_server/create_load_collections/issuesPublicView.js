db.issuesView.aggregate([

    {$project: {desc:0, votes:0, comments:0}}

])