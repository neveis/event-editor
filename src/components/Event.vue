<template>

<div class="event-panel">
    <div class="event">
        <form class="uk-form uk-form-stacked">
            <!-- 事件ID -->
            <div class="uk-form-row">
                <label class="uk-form-label" for="">事件ID</label>
                <div class="uk-form-controls">
                    <input type="text" v-model="eventId" placeholder="Event ID">
                </div>
            </div>
            <!-- 触发方式 -->
            <div class="uk-form-row">
                <label class="uk-form-label" for="">触发方式</label>
                <div class="uk-form-controls trigger-type">
                    <span><input type="radio" name="trigger-type" value="1" v-model="triggerType"> <label>确认键</label></span>
                    <span><input type="radio" name="trigger-type" value="2" v-model="triggerType"> <label>接触</label></span>
                    <span><input type="radio" name="trigger-type" value="3" v-model="triggerType"> <label>接触前</label></span>
                    <span><input type="radio" name="trigger-type" value="0" v-model="triggerType"> <label>自动运行</label></span>
                </div>
            </div>
            <!-- 循环 -->
            <div class="uk-form-row">
                <div class="uk-form-controls">
                    <span><label>循环</label> <input type="checkbox" v-model="loop"></span>
                    <span><label>次数</label> <input type="text" v-model="repeatCount" data-uk-tooltip title="无限循环请填'Infinity'"></span>
                </div>
            </div>
            <!-- 事件页选项卡 需要绑定事件页的ID，以用于切换事件页-->
            <ul class="uk-tab page-tab" :data-uk-tab="'{connect:\'#event-' + eventIndex +'-page\'}'" style="display:inline-block">
                <li v-for="(page,index) in pages">
                    <a>{{ index + 1}}</a>
                </li>
                <button class="uk-button new-page-button" v-on:click="addNewPage()" type="button">new page</button>
            </ul>
            <!-- 事件页 -->
            <ul :id="'event-'+ eventIndex + '-page'" class="uk-switcher">
                <li v-for="(page,pageIndex) in pages">
                    <div class="uk-clearfix">
                        <div class="uk-float-left">
                            <ul class="uk-tab uk-tab-left" :data-uk-tab="'{connect:\'#event-' + eventIndex + '-page-' + pageIndex +'\'}'">
                                <li><a>事件</a></li>
                                <li><a>开关</a></li>
                                <li><a>条件</a></li>
                            </ul>
                        </div>
                        <div class="uk-float-left">
                            <ul class="uk-switcher" :id="'event-' + eventIndex + '-page-' + pageIndex"> 
                                <li>
                                    <div class="uk-float-left sub-event-panel uk-sortable" data-uk-sortable="{handleClass:'uk-sortable-handle'}">
                                        <div class="sub-event" v-for="(subEvent,index) in page.subEvents" :key="subEvent._id" :subEventIndex="index" :pageIndex="pageIndex">
                                            <select v-model.number="subEvent.eventType" v-on:change="changeEventType($event,subEvent)" :id="'event-type-'+ eventIndex +'-' + pageIndex + '-' + index">
                                                <option v-for="(value,key) in eventTypeMap" :value=key>{{ value.optionLabel }}</option>
                                            </select>
                                            <button type="button" class="uk-button uk-icon-unlock-alt" @click.stop="disableTypeSelect($event,'event-type-'+ eventIndex +'-' + pageIndex + '-' + index)"></button>
                                            <button type="button" class="uk-button uk-icon-toggle-up" @click.stop="hideSubEvent($event,'sub-event-' + eventIndex + '-' + pageIndex + '-' + index)"></button>
                                            <button type="button" class="uk-button uk-icon-plus" @click.stop="prependSubEvent(page.subEvents,index)" data-uk-tooltip title="上方新建子事件"></button>
                                            <button type="button" class="uk-button uk-icon-close" @click.stop="delSubEvent(page.subEvents,index)" data-uk-tooltip title="删除子事件"></button>
                                            <i class="uk-sortable-handle uk-icon uk-icon-bars" data-uk-tooltip title="拖动排序"></i>
                                            <component class="sub-event-comp" :is="eventTypeMap[subEvent.eventType]?eventTypeMap[subEvent.eventType].currentView:null" :subEvent="subEvent" :id="'sub-event-' + eventIndex + '-' + pageIndex + '-' + index"></component>
                                        </div>
                                        
                                    </div>  
                                    <div>
                                        <button class="uk-button" id="page-bottom" v-on:click="addNewSubEvent($event,page.subEvents)" type="button">新子事件</button>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <p>开关列表，多个开关使用","隔开</p>
                                        <textarea v-model="page.switcher" rows="1"></textarea>
                                    </div>
                                </li>
                                <li>
                                    条件
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
            <!-- 事件页 END -->
        </form>
    </div>
</div>
</template>

<script>
    import Vue from 'vue'
    import Dialogue from './Dialogue'
    import Shop from './Shop'
    import ExecuteEvent from './ExecuteEvent'
    import ActorMove from './ActorMove'
    import SwitchScene from './SwitchScene'
    import ScrollMap from './ScrollMap'
    import ShowActor from './ShowActor'
    import SetActorPos from './SetActorPos'
    import ShowEmotion from './ShowEmotion'
    import ShowItemMsg from './ShowItemMsg'
    import AddItem from './AddItem'
    import ShowMessage from './ShowMessage'
    import HideUI from './HideUI'
    import SetSwitcher from './SetSwitcher'
    import MapAnimation from './MapAnimation'
    import DoorAnimation from './DoorAnimation'
    import MoveAStar from './MoveAStar'
    import GetTreasure from './GetTreasure'
    import ShowOption from './ShowOption'
    import DelaySecond from './DelaySecond'
    import Fade from './Fade'
    import AudioMusic from './AudioMusic'
    import AudioEffect from './AudioEffect'

    var eventTypeMap = {
        '1': {
            currentView: 'Dialogue',
            optionLabel: '角色对话'
        },
        '2': {
            currentView: 'Shop',
            optionLabel: '商店'
        },
        '3': {
            currentView: 'SwitchScene',
            optionLabel: '场景切换'
        },
        '4': {
            currentView: 'ExecuteEvent',
            optionLabel: '运行指定事件'
        },
        '5': {
            currentView: 'ScrollMap',
            optionLabel: '镜头移动'
        },
        '6': {
            currentView: 'ActorMove',
            optionLabel: '角色移动'
        },
        '7': {
            currentView: 'ShowActor',
            optionLabel: '显示/隐藏角色'
        },
        '9': {
            currentView: 'SetActorPos',
            optionLabel: '设置角色位置'
        },
        '10': {
            currentView: 'ShowEmotion',
            optionLabel: '显示心情'
        },
        '11': {
            currentView: 'ShowItemMsg',
            optionLabel: '显示道具信息'
        },
        '12': {
            currentView: 'AddItem',
            optionLabel: '获得/失去道具'
        },
        '13': {
            currentView: 'ShowMessage',
            optionLabel: '显示信息'
        },
        '14': {
            currentView: 'HideUI',
            optionLabel: '隐藏/显示UI'
        },
        '15': {
            currentView: 'SetSwitcher',
            optionLabel: '设置开关'
        },
        '16': {
            currentView: 'MapAnimation',
            optionLabel: '地图动画'
        },
        '17': {
            currentView: 'DoorAnimation',
            optionLabel: '开/关门动画'
        },
        '18': {
            currentView: 'MoveAStar',
            optionLabel: '自动寻路'
        },
        '19': {
            currentView: 'GetTreasure',
            optionLabel: '拾取宝箱/道具'
        },
        '21': {
            currentView: 'ShowOption',
            optionLabel: '选项'
        },
        '22': {
            currentView: 'DelaySecond',
            optionLabel: '延迟（秒）'
        },
        '23': {
            currentView: 'Fade',
            optionLabel: '淡入/淡出'
        },
        '25': {
            currentView: 'AudioMusic',
            optionLabel: '音乐控制'
        },
        '26': {
            currentView: 'AudioEffect',
            optionLabel: '播放音效'
        },
    };
    export default {
        components: {
            Dialogue,
            Shop,
            SwitchScene,
            ExecuteEvent,
            ScrollMap,
            ActorMove,
            ShowActor,
            SetActorPos,
            ShowEmotion,
            ShowItemMsg,
            AddItem,
            ShowMessage,
            HideUI,
            SetSwitcher,
            MapAnimation,
            DoorAnimation,
            MoveAStar,
            GetTreasure,
            ShowOption,
            DelaySecond,
            Fade,
            AudioMusic,
            AudioEffect
        },
        props: ['event', 'eventIndex'],
        data: function() {
            this.event.eventTypeMap = eventTypeMap;
            return this.event;
        },
        mounted: function() {
            let self = this;
            UIkit.on('change.uk.sortable', function(event, sortableObject, draggedElement, action) {
                //拖动排序后，模拟点击，触发事件
                if (draggedElement) {
                    let oldIndex = $(draggedElement).attr('subEventIndex');
                    let pageIndex = $(draggedElement).attr('pageIndex');
                    let newIndex = $(draggedElement).index()
                    console.log('drag p' + pageIndex, oldIndex, 'to', $(draggedElement).index());
                    let subEvents = self.event.pages[pageIndex].subEvents;
                    if (oldIndex != newIndex) {
                        let temp = subEvents.splice(oldIndex, 1)
                        subEvents.splice(newIndex, 0, temp[0]);
                    }
                }
            });
        },
        methods: {
            addNewPage: function() {
                this.pages.push({
                    switcher: '',
                    subEvents: []
                })
            },
            changeEventType: function(e, subEvent) {
                //subEvent.currentView = eventTypeMap[subEvent.eventType].currentView;
                //如果是最后一个子事件，自动滚动到底部
                subEvent.detail = {};
                Vue.nextTick(function() {
                    if ($(e.target).parent().index() === $(e.target).parent().siblings().length)
                        e.target.parentNode.scrollIntoView();
                })
            },
            disableTypeSelect: function(e, selectId) {
                //切换图标
                $(e.target).toggleClass('uk-icon-unlock-alt').toggleClass('uk-icon-lock');

                let target = $('#' + selectId);
                if (target.attr('disabled')) {
                    target.removeAttr('disabled');
                } else {
                    target.attr('disabled', 'disabled')
                }
            },
            hideSubEvent: function(e, subEventId) {
                $(e.target).toggleClass('uk-icon-toggle-down').toggleClass('uk-icon-toggle-up');
                $('#' + subEventId).toggleClass('uk-hidden');
            },
            addNewSubEvent: function(e, subEvents) {
                subEvents.push({
                    detail: {},
                    eventType: '',
                    //currentView: '',
                    _id: subEvents.length
                })
            },
            prependSubEvent: function(subEvents, index) {
                subEvents.splice(index, 0, {
                    detail: {},
                    eventType: '',
                    _id: subEvents.length
                });
            },
            delSubEvent: function(subEvents, index) {
                subEvents.splice(index, 1);
            }
        }
    }
</script>

<style>
    .event-panel {
        margin: 20px;
        height: calc(100% - 40px);
        overflow: auto;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, .5);
    }
    
    .event {
        padding: 15px;
    }
    
    .event .uk-form-row {
        margin-left: 50px;
    }
    
    .event .trigger-type span {
        margin-right: 15px
    }
    
    .event .page-tab {
        margin-top: 15px;
        padding-left: 50px;
    }
    
    .event .new-page-button {
        display: inline-block;
        padding: 8px 12px 6px 12px;
        line-height: 20px;
        margin-left: 15px;
        margin-bottom: 2px;
    }
    
    .event .uk-switcher {
        margin-top: 10px;
    }
    
    .event .sub-event-panel {
        margin-left: 10px;
    }
    
    .event .sub-event {
        margin-bottom: 15px;
    }
    
    .event .sub-event-comp {
        margin-top: 15px;
    }
    
    .event .sub-event i.uk-sortable-handle {
        padding: 8px 10px;
    }
    
     ::-webkit-scrollbar {
        width: 14px;
        opacity: 0;
    }
    
     ::-webkit-scrollbar-track {
        -webkit-transition: opacity .8s linear;
        transition: opacity .8s linear;
        opacity: 0;
    }
    
     ::-webkit-scrollbar:hover {
        opacity: 1;
        background: transparent;
        -webkit-transition: opacity .1s linear;
        transition: opacity .1s linear
    }
    
     ::-webkit-scrollbar-thumb {
        background-color: hsla(0, 0%, 47%, 0);
    }
    
     ::-webkit-scrollbar-thumb:hover {
        transition: opacity 0ms linear;
        background-color: hsla(0, 0%, 39%, .7)
    }
    
     ::-webkit-scrollbar-thumb:active {
        background: hsla(0, 0%, 75%, .4)
    }
</style>