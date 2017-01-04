'use strict';
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('resize-window', function(event, message) {
    $('.board').css('height', message[1]);
})

$("#output").click(function() {
    var eventsList = _vm.$children[0].events;
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
        var pages = events[eventId].pages;
        for (var j = 0; j < pages.length; j++) {
            var subEvents = pages[j].subEvents;
            for (var k = 0; k < subEvents.length; k++) {
                subEvents[k]['_id'] = undefined;
                //subEvents[k]['currentView'] = undefined;
                if (subEvents[k].eventType === 1) {
                    //对话
                    let actors = subEvents[k].detail.actors;
                    actors.forEach(function(actor, index, actors) {
                        actor._id = undefined;
                        actor.dialogues.forEach(function(dialogue, index, dialogues) {
                            dialogues[index] = dialogue.text;
                        })
                    })
                } else if (subEvents[k].eventType === 2) {
                    //商店
                    subEvents[k].detail.itemIdList = subEvents[k].detail.itemIdList.split(',');
                } else if (subEvents[k].eventType === 14) {
                    //隐藏UI
                    subEvents[k].detail.nodeList = subEvents[k].detail.nodeList.split(',');
                }
            }
        }
    }

    ipcRenderer.send('output-event-file', JSON.stringify(events, null, '  '));
})

$('#import').click(function() {
    var events = ipcRenderer.sendSync('import-event-file');
    if (!events) {
        return;
    }
    events = JSON.parse(events);
    for (var eventId in events) {
        var pages = events[eventId].pages;
        for (var i = 0; i < pages.length; i++) {
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
                } else if (subEvents[j].eventType === 14) {
                    //隐藏UI
                    subEvents[j].detail.nodeList = subEvents[j].detail.nodeList.join(',');
                }
            }
        }
    }
    console.log(events);
    for (var eventId in events) {
        var event = events[eventId];
        _vm.$children[0].count++;
        _vm.$children[0].events.push({
            event: Object.assign({}, event),
            index: _vm.$children[0].count
        })
    }
})