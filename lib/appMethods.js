Meteor.methods({
  newMessage: function (message) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }

   check(message, {
      text: String,
      chatId: String
    });

  message.timestamp = new Date();
  message.userId = this.userId;
 
	var messageId = Messages.insert(message);
	Chats.update(message.chatId, { $set: { lastMessage: message } });
	 
	return messageId;
  },
  
  updateName: function (name) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
 
    check(name, String);
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must proive user name');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
  },
  updatePersonal: function (personal) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }
 
    check(personal, String);
    if (personal.length === 0) {
      throw Meteor.Error('personal-required', 'Must proive your personal message');
    }
 
    return Meteor.users.update(this.userId, { $set: { 'profile.personal': personal } });
  },
  newChat: function (otherId) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }
 
    check(otherId, String);
 
    var otherUser = Meteor.users.findOne(otherId);
    if (! otherUser) {
      throw new Meteor.Error('user-not-exists',
        'Chat\'s user not exists');
    }
 
    var chat = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };
 
    var chatId = Chats.insert(chat);
 
    return chatId;
  },
  removeChat: function (chatId) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }
 
    check(chatId, String);
 
    var chat = Chats.findOne(chatId);
    if (! chat || ! _.include(chat.userIds, this.userId)) {
      throw new Meteor.Error('chat-not-exists',
        'Chat not exists');
    }
 
    Messages.remove({ chatId: chatId });
 
    return Chats.remove({ _id: chatId });
  },
  updatePicture: function (data) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his picture.');
    }
 
    check(data, String);
 
    return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  },
  saveCalEvent: function (ce) {
    var eventId = CalEvent.insert(ce);

    //return eventId;
  }

});
