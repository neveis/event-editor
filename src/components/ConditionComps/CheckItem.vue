<template>
<div class="check-item">
	<ul>
		<li>
			<label>类型</label>
			<input type="text" v-model.number="condition.detail.type">
		</li>
		<li>
			<label>道具ID</label>
			<input type="text" v-model="condition.detail.itemId">
		</li>
		<li>
			<label>数量</label>
			<input type="text" v-model.number="condition.detail.num">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'check-item',
        props: ['condition'],
        created: function() {
            this.condition.detail = Object.assign({
                type: null,
                itemId: null,
                num: null
            }, this.condition.detail)
        },
    }
</script>