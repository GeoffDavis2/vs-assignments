const { v4: uuid } = require("uuid");

const data = [
    { name: "Todo Number 01", description: "The description of todo 01", imageUrl: "https://picsum.photos/id/1/5616/3744", completed: false },
    { name: "Todo Number 02", description: "The description of todo 02", imageUrl: "https://picsum.photos/id/10/2500/1667", completed: true },
    { name: "Todo Number 03", description: "The description of todo 03", imageUrl: "https://picsum.photos/id/100/2500/1656", completed: false },
    { name: "Todo Number 04", description: "The description of todo 04", imageUrl: "https://picsum.photos/id/1000/5626/3635", completed: true },
    { name: "Todo Number 05", description: "The description of todo 05", imageUrl: "https://picsum.photos/id/1001/5616/3744", completed: true },
    { name: "Todo Number 06", description: "The description of todo 06", imageUrl: "https://picsum.photos/id/1002/4312/2868", completed: false },
    { name: "Todo Number 07", description: "The description of todo 07", imageUrl: "https://picsum.photos/id/1003/1181/1772", completed: false },
    { name: "Todo Number 08", description: "The description of todo 08", imageUrl: "https://picsum.photos/id/1004/5616/3744", completed: true },
    { name: "Todo Number 09", description: "The description of todo 09", imageUrl: "https://picsum.photos/id/1005/5760/3840", completed: true },
    { name: "Todo Number 10", description: "The description of todo 10", imageUrl: "https://picsum.photos/id/1006/3000/2000", completed: false },
    { name: "Todo Number 11", description: "The description of todo 11", imageUrl: "https://picsum.photos/id/1008/5616/3744", completed: true },
    { name: "Todo Number 12", description: "The description of todo 12", imageUrl: "https://picsum.photos/id/1009/5000/7502", completed: false },
    { name: "Todo Number 13", description: "The description of todo 13", imageUrl: "https://picsum.photos/id/101/2621/1747", completed: true },
    { name: "Todo Number 14", description: "The description of todo 14", imageUrl: "https://picsum.photos/id/1010/5184/3456", completed: true },
    { name: "Todo Number 15", description: "The description of todo 15", imageUrl: "https://picsum.photos/id/1011/5472/3648", completed: false }
];

module.exports.data = data.map(obj => ({ _id: uuid(), ...obj }));