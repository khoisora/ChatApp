var randomColor = function() {
    var colors = ['navy', 'slate', 'olive', 'moss', 'chocolate', 'buttercup', 'maroon', 'cerise', 'plum', 'orchid'];
    return colors[(Math.random() * colors.length) >>> 0];
};

var randomCat = function() {
    var cats = ['tabby', 'bengal', 'persian', 'mainecoon', 'ragdoll', 'sphynx', 'siamese', 'korat', 'japanesebobtail', 'abyssinian', 'scottishfold'];
    return cats[(Math.random() * cats.length) >>> 0];
};

Accounts.onCreateUser(function(options, user) {
    user.color = randomColor();
    user.avatar = 'images/' + randomCat() + '.jpg';
    user.balance = Math.floor((Math.random() * 900) + 100);
    if (options.profile)
    user.profile = options.profile;
	user.secuCode = options.profile.secuCode;
    return user;
});

Meteor.publish("users", function () {
    return Meteor.users.find({});
});