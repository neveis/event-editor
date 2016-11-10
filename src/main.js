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

if (window || !windows.module) {
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
}