var makeMessage = function(from, text) {
    return {
        from: from,
        text: text,
        createdAt: new Date().getTime()
    };
};


module.exports = makeMessage;