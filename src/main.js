"use strict";

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
            events[eventId].eventTypeMap = undefined;
            events[eventId].conditionTypeMap = undefined;
            if (events[eventId].repeatCount !== 'Infinity') {
                let count = parseInt(events[eventId].repeatCount);
                //防止出现非法值
                if (isNaN(count)) {
                    events[eventId].repeatCount = 0;
                }
                events[eventId].repeatCount = count;
            }
            var pages = events[eventId].pages;
            for (var j = 0; j < pages.length; j++) {
                if (pages[j].switcher == '') {
                    pages[j].switcher = []
                } else {
                    pages[j].switcher = pages[j].switcher.split(',');
                }
                var subEvents = pages[j].subEvents;
                for (var k = 0; k < subEvents.length; k++) {
                    subEvents[k]['_id'] = undefined;
                    //subEvents[k]['currentView'] = undefined;
                    if (subEvents[k].eventType === 1) {
                        let actors = subEvents[k].detail.actors;
                        actors.forEach(function(actor, index, actors) {
                            actor._id = undefined;
                            actor.dialogues.forEach(function(dialogue, index, dialogues) {
                                dialogues[index] = dialogue.text;
                            })
                        })
                    } else if (subEvents[k].eventType === 2) {
                        //商店
                        if (subEvents[k].detail.itemIdList == '') {
                            subEvents[k].detail.itemIdList = [];
                        } else {
                            subEvents[k].detail.itemIdList = subEvents[k].detail.itemIdList.split(',');
                        }
                    } else if (subEvents[k].eventType === 14) {
                        //隐藏UI
                        if (subEvents[k].detail.nodeList == '') {
                            subEvents[k].detail.nodeList = [];
                        } else {
                            subEvents[k].detail.nodeList = subEvents[k].detail.nodeList.split(',');
                        }
                    }
                }
            }
        }
        console.log(events);
        console.log(JSON.stringify(events, null, '  '));
    })


    $('#import').click(function() {
        var data = `{
  "2": {
    "eventId": "2",
    "triggerType": "1",
    "pages": [
      {
          "switcher": [
          "1",
          "23",
          "4",
          "5",
          "6"
        ],
        "subEvents": [
          {
            "detail": {
              "actors": [
                {
                  "name": "112",
                  "dialogues": [
                    "3333"
                  ]
                }
              ]
            },
            "eventType": 1
          },
          {
            "detail": {
              "itemIdList": [
                "1",
                "2",
                "3",
                "4"
              ]
            },
            "eventType": 2
          }
        ]
      }
    ]
  }
}`;
        data = JSON.parse(data);
        for (var eventId in data) {
            if (!data[eventId].loop) {
                data[eventId].loop = false;
            }
            if (!data[eventId].repeatCount) {
                data[eventId].repeatCount = '0';
            } else {
                data[eventId].repeatCount = data[eventId].repeatCount.toString();
            }
            var pages = data[eventId].pages;
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].switcher) {
                    pages[i].switcher = pages[i].switcher.join(',');
                } else {
                    pages[i].switcher = '';
                }
                var subEvents = pages[i].subEvents
                for (var j = 0; j < subEvents.length; j++) {
                    var subEvent = subEvents[j];
                    subEvent['_id'] = j + 1;
                    if (subEvent.eventType === 1) {
                        //subEvent['currentView'] = 'Dialogue';
                        let actors = subEvent.detail.actors;
                        actors.forEach(function(actor, index, actors) {
                            actor._id = index + 1;
                            actor.dialogues.forEach(function(dialogue, index, dialogues) {
                                dialogues[index] = {
                                    text: dialogue,
                                    _id: index + 1
                                };
                            })
                        })
                    } else if (subEvent.eventType === 2) {
                        subEvent.detail.itemIdList = subEvent.detail.itemIdList.join(',');
                    } else if (subEvents[k].eventType === 14) {
                        //隐藏UI
                        subEvents[k].detail.nodeList = subEvents[k].detail.nodeList.join(',');
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