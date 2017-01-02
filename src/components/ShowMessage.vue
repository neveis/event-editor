<template>
<div class="show-message">
    <ul>
        <li>
            <label>信息</label>
            <textarea v-model="subEvent.detail.message" rows="1"></textarea>
        </li>
    </ul>
</div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'show-message',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                message: '',
            }, this.subEvent.detail)
            Vue.nextTick(function() {
                autosize($('textarea'));
            })
        },
    }
</script>