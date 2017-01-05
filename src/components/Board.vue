<template>
	<div class="board">
		<div class="siderbar">
			<div class="content">
				<div class="header">
					<div class="title uk-display-inline-block">
						<span>事件列表</span>
					</div>
					<div class="toolbar uk-float-right">
						<i class="uk-icon-plus-square icon" @click="addNewEvent"></i>
					</div>
				</div>
				<div class="list">
					<div v-for="(event,index) in events" class="item" :key="event.index" :class="{selected:index === selectedIndex}" @click="selectEvent(index)">
						<div class="icon" @click.stop="delEvent(index)">
							<i class="uk-icon-remove"></i>
						</div>
						<span>{{ '事件 ' + event.event.eventId }}</span>
					</div>
				</div>
			</div>
			<div class="output-button" id="output">输出</div>
            <div class="output-button" id="import">导入</div>
		</div>
		<div class="main-panel">
			<Event v-for="(event,index) in events" :key="event.index" :eventIndex="event.index" :event="event.event" class="uk-animation-slide-left uk-animation-1"
				:class="{'uk-hidden':index !== selectedIndex}"></Event>
		</div>
		<!--
        <div class="uk-width-1-3" >
        <button class="uk-button" @click="addNewEvent">新事件</button><br>
        <button class="uk-button" id="output">输出</button>
        </div>
        -->
	</div>
</template>

<script>
    import Vue from 'vue'
    import Event from './Event'
    export default {
        components: {
            Event
        },
        data: function() {
            return {
                events: [

                ],
                selectedIndex: -1,
                count: 0
            }
        },
        methods: {
            addNewEvent: function() {
                this.count++;
                this.events.push({
                    index: this.count,
                    event: {
                        eventId: '',
                        triggerType: '1',
                        loop: false,
                        repeatCount: '0',
                        pages: [{
                            switcher: '',
                            subEvents: []
                        }]
                    }
                });
                this.selectedIndex = this.events.length - 1;

            },
            selectEvent: function(index) {
                this.selectedIndex = index;
                Vue.nextTick(function() {
                    autosize.update($('textarea'));
                })
            },
            delEvent: function(index) {
                this.events.splice(index, 1);
                //如果选中的是最后一个元素，删除后则自动选中删除后的最后一个元素
                if (this.selectedIndex === this.events.length) {
                    this.selectedIndex--;
                }
            }
        }
    }
</script>

<style>
    .board {
        height: 600px;
        display: flex;
        flex-wrap: nowrap;
    }
    
    .board .siderbar {
        background-color: #1e1e1e;
        color: #ccc;
        padding: 0px;
        z-index: 1;
        flex: 0 0 200px;
    }
    
    .board .siderbar .content {
        height: calc(100% - 30px);
        background-color: #252526;
        font-size: 13px;
        line-height: 22px;
    }
    
    .board .siderbar .content .header {
        height: 22px;
        background-color: rgba(127, 127, 127, 0.2);
        padding-left: 20px;
        font-size: 11px;
    }
    
    .board .siderbar .content .header .toolbar {
        display: none;
        margin-right: 10px;
    }
    
    .board .siderbar .content .header:hover .toolbar {
        display: inline-block;
    }
    
    .board .siderbar .content .header:hover .toolbar:hover {
        cursor: pointer;
    }
    
    .board .siderbar .content .header .toolbar i {
        font-size: 130%;
        vertical-align: middle;
    }
    
    .board .siderbar .content .header .toolbar i:hover {
        vertical-align: middle;
        color: #fff
    }
    
    .board .siderbar .content .list {
        height: calc(100% - 22px);
        overflow: auto;
    }
    
    .board .siderbar .content .list .item {
        padding-left: 20px;
        height: 22px;
        font-size: 13px;
    }
    
    .board .siderbar .content .list .item:hover {
        background-color: #2a2d2e
    }
    
    .board .siderbar .content .list .item.selected {
        background-color: #094771;
        color: #fff;
        /*
        background-color: #3f3f46;
        */
    }
    /*
    .board .siderbar .content .list .item.focused {
        background-color: #0e639c;
        color: #fff;
    }
    
    .board .siderbar .content .list .item.focused.selected {
        background-color: #094771;
        color: #fff;
    }
    */
    
    .board .siderbar .content .list .item .icon {
        display: inline-block;
        width: 13px;
    }
    
    .board .siderbar .content .list .item .icon i {
        display: none;
    }
    
    .board .siderbar .content .list .item:hover .icon i {
        display: inline-block;
        cursor: pointer;
    }
    
    .board .siderbar .output-button {
        height: 30px;
        width: 40px;
        text-align: center;
        line-height: 30px;
        display: inline-block;
        float: right;
        margin-right: 15px;
        cursor: default;
    }
    
    .board .siderbar .output-button:hover {
        background-color: #2a2d2e;
    }
    
    .board .siderbar .output-button:active {
        background-color: #094771;
    }
    
    .main-panel {
        padding: 0;
        flex: 1;
    }
</style>