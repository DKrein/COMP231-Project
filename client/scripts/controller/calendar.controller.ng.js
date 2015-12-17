angular
  .module('COMP231-Project')
  .controller('CalendarCtrl', CalendarCtrl);

function CalendarCtrl ($scope, $ionicModal, $meteor) {
  //$scope.data = {};
  var calendar = $('#calendar').fullCalendar({
  	dayClick:function(date,allDay,jsEvent,view){
  		var calendarEvent = {};

  		calendarEvent.start = date;
  		calendarEvent.end = date;
  		calendarEvent.title = "New Event";
  		calendarEvent.owner = Meteor.userId();

  		$meteor.call('saveCalEvent',calendarEvent);
  	},
  	events:function(start,end,callback){
  		var calEvents = CalEvent.find({},{reactive: false}).fetch(); 
  		//var calEvents = CalEvent.find().fetch(); 
  		console.log(calEvents);

  		callback(calEvents);
  	}
  }).data().fullCalendar;

  Deps.autorun(function(){
  	CalEvent.find().fetch();
  	if(calendar){
  		calendar.refetchEvents();
  	}
  })

  
}