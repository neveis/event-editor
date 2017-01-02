<template>
<div class="hide-ui">
    <ul>
        <li>
            <label>节点列表</label>
            <textarea v-model="subEvent.detail.nodeList" rows="1"></textarea>
        </li>
        <li>
			<label>隐藏</label>
			<input type="checkbox" v-model="subEvent.detail.hide">
		</li>
    </ul>
</div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'hide-ui',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                nodeList: '',
                hide: true,
            }, this.subEvent.detail)
            Vue.nextTick(function() {
                autosize($('textarea'));
            })
        },
    }
</script>