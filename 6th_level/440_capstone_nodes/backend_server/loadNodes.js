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


async function main() {

    User.collection.drop();
    Node.collection.drop();

    const userObj = new User({username: 'a', password: 'a'});
    userObj.save();
    // const userObj = (await User.findOne({ username: 'a' }))._id;
    const user = userObj._id;
    console.log('user._id: ', user);

    for (let p = 1; p < 9; p++) {
        const parentNode = new Node({ user, title: `Parent #${p}`, type: 'plain' });
        const parent = parentNode._id

        for (let c = 1; c < 9; c++) {
            const childNode = new Node({ user, title: `Parent #${p}'s Child #${c}`, type: 'plain', parent });
            console.log(childNode);
            const child = childNode._id;
            if (!parentNode.children.find(obj => obj.equals(child))) {
                parentNode.children.push(child);
            }
            childNode.save();
        }
        console.log(parentNode);
        parentNode.save();
    }

};
main();