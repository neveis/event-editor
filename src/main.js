import Vue from 'vue'
import Board from './components/Board'

var vm = new Vue({
    el: '#app',
    template: '<Board/>',
    components: {
        Board
    }
})

global._vm = vm;

if (!window.module) {
    $('#output').click(function() {
        var eventsList = vm.$children[0].events;
        /*
        if (!eventsList) {
            return;
        }
        */
        console.log(eventsList);
        var events = {};
        for (var i = 0; i < eventsList.length; i++) {
            //拷贝vm实例中的数据到一个新的对象。
            //因为实际要对vm中的数据进行处理，所以不能直接引用vm实例的数据。
            //需要剔除一些不用的数据，以及数据结构的转换
            let eventData = eventsList[i].event;
            let eventId = eventData.eventId;
            events[eventId] = JSON.parse(JSON.stringify(eventData));
            var pages = events[eventId].pages;
            for (var j = 0; j < pages.length; j++) {
                var subEvents = pages[j].subEvents;
                for (var k = 0; k < subEvents.length; k++) {
                    subEvents[k]['_id'] = undefined;
                    subEvents[k]['currentView'] = undefined;
                    if (subEvents[k].eventType === '1') {
                        subEvents[k].detail.dialogues.forEach(function(dialogue, index, dialogues) {
                            dialogues[index] = dialogue.text;
                        })
                    }
                }
            }
        }
        console.log(events);
        console.log(JSON.stringify(events, null, '  '));
    })


    $('#import').click(function() {
        var data = `{
  "1": {
    "eventId": "1",
    "triggerType": "2",
    "pages": [
      {
        "subEvents": [
          {
            "detail": {
              "name": "123",
              "dialogues": [
                "44"
              ]
            },
            "eventType": "1"
          },
          {
            "detail": {
              "actorId": "3",
              "pos": {
                "x": 2,
                "y": 1
              },
              "direction": 8
            },
            "eventType": "2"
          }
        ]
      },
      {
        "subEvents": []
      }
    ]
  },
  "1-2-3": {
    "eventId": "1-2-3",
    "triggerType": "1",
    "pages": [
      {
        "subEvents": [
          {
            "detail": {
              "actorId": "1",
              "pos": {
                "x": 2,
                "y": 1
              },
              "direction": 8
            },
            "eventType": "2"
          }
        ]
      }
    ]
  }
}`;
        data = JSON.parse(data);
        for (var eventId in data) {
            var pages = data[eventId].pages;
            for (var i = 0; i < pages.length; i++) {
                var subEvents = pages[i].subEvents
                for (var j = 0; j < subEvents.length; j++) {
                    var subEvent = subEvents[j];
                    subEvent['_id'] = j + 1;
                    if (subEvent.eventType === '1') {
                        subEvent['currentView'] = 'Dialogue';
                        subEvent.detail.dialogues.forEach(function(dialogue, index, dialogues) {
                            dialogues[index] = {
                                text: dialogue,
                                _id: index + 1
                            };
                        })
                    } else {
                        subEvent['currentView'] = 'ActorMove';
                    }
                }
            }
        }
        console.log(data);
        for (var eventId in data) {
            var event = data[eventId];
            vm.$children[0].count++;
            vm.$children[0].events.push({
                event: Object.assign({}, event),
                index: vm.$children[0].count
            })
        }
    })

}