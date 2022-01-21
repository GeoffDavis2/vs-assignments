console.log("\033c");

module.exports = (mongoose = require("mongoose"));
mongoose.connect(
    "mongodb://localhost:27017/nodes",
    // "mongodb://172.18.0.1:27017/rock-the-vote",    
    // "mongodb+srv://trend_geoff_lev5_capstone:7654@cluster0.7hfsb.mongodb.net/county-clerk",
    () => {
        (mongoose.connection.readyState === 0) && console.log("\n********** Disonnected from MongoDB **********\n");
        (mongoose.connection.readyState === 1) && console.log("\n********** Connected to MongoDB **********\n");
        (mongoose.connection.readyState === 2) && console.log("\n********** Connecting to MongoDB **********\n");
        (mongoose.connection.readyState === 3) && console.log("\n********** Disonnecting from MongoDB **********\n");
    }
);

const { ObjectId } = require("mongodb");

const User = require("./data_models/users");
const Node = require("./data_models/nodes");

const getUsers = async () => await User.find();
const getNodes = async () => await Node.find();

const dropAndPopNodes = user => {
    Node.collection.drop();

    const topNode = new Node({ user, title: `Top Node`, type: 'plain', sort: 0 });
    const top = topNode._id
    topNode.save();

    const p_lev = 4;
    const c_lev = 2;
    for (let p = 1; p < p_lev; p++) {
        const parentNode = new Node({ user, title: `Parent #${p}`, type: 'plain', parent: topNode._id,sort: (p - 1) });
        const parent = parentNode._id;
        parentNode.save();
        if (!topNode.children.find(obj => obj.equals(parent))) topNode.children.push(parent);

        for (let c = 1; c < c_lev; c++) {
            const childNode = new Node({ user, title: `Child #${c} of Parent #${p}`, type: 'plain', parent, sort: (c - 1) });
            console.log(childNode);
            const child = childNode._id;
            childNode.save();
            if (!parentNode.children.find(obj => obj.equals(child))) parentNode.children.push(child);
        }
        console.log(parentNode);
    }
}


async function main() {

    // User.collection.drop();
    // const userObj = new User({ username: 'a', password: 'a' });
    // userObj.save();
    const userObj = (await User.findOne({ username: 'a' }))._id;
    const user = userObj._id;
    console.log('user._id: ', user);

    // dropAndPopNodes(user);

    // const topLevel = await Node.aggregate([
    //     { $match: { parent: { $exists: false } } },
    //     { $lookup: { from: 'nodes', localField: 'children', foreignField: '_id', as: 'children' } }
    // ]).exec();
    // console.log(topLevel);

};
main();