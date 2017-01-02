<template>
<div class="show-shop">
    <ul>
        <li>
            <label>道具ID列表</label>
            <textarea v-model="subEvent.detail.itemIdList" rows="1"></textarea>
        </li>
    </ul>
</div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'show-shop',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                itemIdList: '',
            }, this.subEvent.detail)
            Vue.nextTick(function() {
                autosize($('textarea'));
            })
        },
    }
</script>