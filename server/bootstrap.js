Meteor.startup(function () {
 	if (Chats.find().count() === 0) {
    Messages.remove({});
 
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
      }
    ];
 
    messages.forEach(m => {
      Messages.insert(m);
    });
 
    var chats = [
      {
        name: 'Christine',
        //picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg'
      },
      {
        name: 'Eunmi',
        //picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg'
      },
      {
        name: 'Yarik',
        picture: 'https://i.imgur.com/upvbaPC.jpg'
      },
      {
        name: 'Yusi',
       // picture: 'https://randomuser.me/api/portraits/thumb/women/4.jpg'
      },
      {
        name: 'Kent',
       // picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg'
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