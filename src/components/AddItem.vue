<template>
<div class="add-item">
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
			<input type="text" v-model.number="subEvent.detail.num">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'add-item',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                type: 0,
                itemId: '',
                num: 0
            }, this.subEvent.detail)
        },
    }
</script>