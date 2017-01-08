<template>
<div class="show-loading">
    <ul>
        <li>
			<label>显示</label>
			<input type="checkbox" v-model="subEvent.detail.show">
		</li>
    </ul>
</div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'show-loading',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                show: true
            }, this.subEvent.detail)
        },
    }
</script>