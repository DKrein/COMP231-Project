Meteor.methods({
    newMessage: function (message) {
        check(message, {
            conversation: String,
            chatID: String
        });

        Chats.update(message.chatId, { $set: { lastMessage: message } });


        message.timestamp = new Date();
        var messageId = Messages.insert(message);

        return messageId;
    }
});
