Meteor.startup(function () {
 	if (Chats.find().count() === 0) {
    Messages.remove({});
 //
    var messages = [
      {
        text: 'Yes, I don\'t like github', 
        timestamp: moment().subtract(1, 'hours').toDate()
      },
      {
        text: 'Hey, it\'s me',
        timestamp: moment().subtract(2, 'hours').toDate()
      },
      {
        text: 'Can we meet at Thursday?',
        timestamp: moment().subtract(1, 'days').toDate()
      },
      {
        text: 'Look my new Ducati...',
        timestamp: moment().subtract(4, 'days').toDate()
      },
      {
        text: 'Hey what\'s up',
        timestamp: moment().subtract(2, 'weeks').toDate()
      },
    {
        text: 'Hey, just 20 minutes of Trove',
        timestamp: moment().subtract(2, 'weeks').toDate()
    }
    ];
 
    messages.forEach(m => {
      Messages.insert(m);
    });
 
    var chats = [
      {
        name: 'Christine',
        picture: 'http://i.imgur.com/0IJUt0T.jpg'
      },
      {
        name: 'Eunmi',
        picture: 'http://i.imgur.com/kPdrbTf.jpg'
      },
      {
        name: 'Yarik',
        picture: 'https://i.imgur.com/upvbaPC.jpg'
      },
      {
        name: 'Yusi',
        picture: 'http://i.imgur.com/tliNtcA.jpg'
      },
      {
        name: 'Kent',
        picture: 'http://i.imgur.com/lyRMbhN.jpg'
      },
    {
        name: 'Douglas',
        picture: 'http://i.imgur.com/FL9NqJG.jpg'
    }
    ];
 
    chats.forEach(chat => {
      let message = Messages.findOne({chatId: {$exists: false}});
      chat.lastMessage = message;
      let chatId = Chats.insert(chat);
      Messages.update(message._id, {$set: {chatId: chatId}})
    });
  }
});