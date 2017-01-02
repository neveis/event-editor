<template>
<div class="dialogue">
	<ul v-for="(actor,index) in subEvent.detail.actors" :key="actor._id">
		<li><span>名字</span>
			<input type="text" v-model="actor.name">
		</li>
		<li><span>内容</span></li>
		<ul class="dialogue-content">
			<li v-for="(dialogue,index) in actor.dialogues" :key="dialogue._id" class="uk-animation-slide-top">
				<textarea v-model="dialogue.text" rows="1"></textarea>
                <div class="dialogue-control uk-visible-hover-inline">
                    <button v-on:click="delDialog(actor.dialogues,index)" type="button" class="uk-button uk-button-small uk-hidden uk-animation-fade">-</button>
                    <button v-on:click="addDialog(actor.dialogues,index)" type="button" class="uk-button uk-button-small uk-hidden uk-animation-fade">+</button>
                </div>
			</li>
        </ul>
        <button v-on:click="delActor(subEvent.detail.actors,index)" type="button" class="uk-button uk-button-small">-</button>
        <button v-on:click="addActor(subEvent.detail.actors,index)" type="button" class="uk-button uk-button-small">+</button>
    </ul>
</div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'event-dialogue',
        props: ['subEvent'],
        created: function() {
            //如果是导入，detail本身会有值，所以不能直接赋值一个空值
            this.subEvent.detail = Object.assign({
                actors: [{
                    name: '',
                    dialogues: [{
                        text: '',
                        _id: 0
                    }],
                    _id: 0
                }]
            }, this.subEvent.detail)
            Vue.nextTick(function() {
                autosize($('textarea'));
            })
        },
        methods: {
            addActor: function(actors, index) {
                actors.splice(index + 1, 0, {
                    name: '',
                    dialogues: [{
                        text: '',
                        _id: 0
                    }],
                    _id: actors.length
                })
            },
            delActor: function(actors, index) {
                actors.splice(index, 1);
            },
            addDialog: function(dialogues, index) {
                dialogues.splice(index + 1, 0, {
                    text: '',
                    _id: dialogues.length
                });
                //设置为自适应高度
                Vue.nextTick(function() {
                    autosize($('textarea'));
                })
            },
            delDialog: function(dialogues, index) {
                dialogues.splice(index, 1);
            }
        }
    }
</script>

<style>
    .dialogue span {
        padding: 0px 5px;
    }
    
    .dialogue .dialogue-content li {
        margin-bottom: 10px;
    }
    
    .dialogue textarea {
        width: 250px;
        margin-bottom: 3px;
    }
    
    .dialogue .dialogue-control {
        height: 25px;
    }
</style>