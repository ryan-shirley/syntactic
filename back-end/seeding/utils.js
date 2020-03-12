module.exports = {
    generateMongoObjectId: function() {
        var timestamp = ((new Date().getTime() / 1000) | 0).toString(16)
        return (
            timestamp +
            "xxxxxxxxxxxxxxxx"
                .replace(/[x]/g, function() {
                    return ((Math.random() * 16) | 0).toString(16)
                })
                .toLowerCase()
        )
    },
    randomNumber: function(min, max) {  
        return Math.floor(Math.random() * (max - min) + min); 
    } 
}
