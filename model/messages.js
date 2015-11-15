Messages = new Mongo.Collection("messages");

Messages.allow({
    insert: function (userId, msg) {
        return userId && msg.from === userId;
    }
});