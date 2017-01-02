<template>
<div class="show-item-msg">
	<ul>
		<li>
			<label>类型</label>
			<input type="text" v-model.number="subEvent.detail.type">
		</li>
		<li>
			<label>道具ID</label>
			<input type="text" v-model="subEvent.detail.itemId">
		</li>
		<li>
			<label>数量</label>
			<input type="text" v-model.number="subEvent.detail.count">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'show-item-msg',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                type: 0,
                itemId: '',
                count: 0
            }, this.subEvent.detail)
        },
    }
</script>