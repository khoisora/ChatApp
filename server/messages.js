Meteor.publish("messages", function () {
    return Messages.find({
            $or:[
                {from: this.userId},
                {to: this.userId}
            ]
        });
});

