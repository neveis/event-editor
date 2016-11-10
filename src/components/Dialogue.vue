<template>
<div class="dialogue">
	<ul>
		<li><span>名字</span>
			<input type="text" v-model="subEvent.detail.name">
		</li>
		<li><span>内容</span></li>
		<ul class="dialogue-content">
			<li v-for="(dialogue,index) in subEvent.detail.dialogues" :key="dialogue._id" class="uk-animation-slide-top">
				<textarea v-model="dialogue.text" rows="1"></textarea>
                <div class="dialogue-control uk-visible-hover-inline">
                    <button v-on:click="delDialog(subEvent.detail.dialogues,index)" type="button" class="uk-button uk-button-small uk-hidden uk-animation-fade">-</button>
                    <button v-on:click="addDialog(subEvent.detail.dialogues,index)" type="button" class="uk-button uk-button-small uk-hidden uk-animation-fade">+</button>
                </div>
			</li>
            
        </ul>
    </ul>
</div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'event-dialogue',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = {
                name: '',
                dialogues: [{
                    text: '',
                    _id: 0
                }]
            }
            Vue.nextTick(function() {
                autosize($('textarea'));
            })
        },
        methods: {
            addDialog: function(dialogues, index) {
                dialogues.splice(index + 1, 0, {
                    text: '',
                    _id: this.subEvent.detail.dialogues.length
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