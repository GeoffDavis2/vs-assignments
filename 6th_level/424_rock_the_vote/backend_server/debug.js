debug = true;
module.exports = {

    debugSource: (req) => {
        if (debug) {
            console.log(`\n********** ${req.method} from: ${req.originalUrl} **********`);
            for (const prop in req) if (["params", "query", "body"].includes(prop))
                console.log(`---------------------- ${prop}\n`, req[prop]);
        }
    },

    debugReturn: (data) => debug && console.log('---------------------- Returning data\n', data),

    DEBUG: debug

}