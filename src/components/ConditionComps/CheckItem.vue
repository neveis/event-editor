<template>
<div class="check-item">
	<ul>
		<li>
			<label>类型</label>
			<input type="text" v-model.number="condition.detail.type" data-uk-tooltip title="0：金钱 1：道具">
		</li>
		<li>
			<label>道具ID</label>
			<input type="text" v-model="condition.detail.itemId">
		</li>
		<li>
			<label>数量</label>
			<input type="text" v-model.number="condition.detail.num">
		</li>
        <li>
			<label>条件</label>
			<select v-model.number="condition.detail.compare">
				<option value="0">等于</option>
				<option value="1">大于</option>
				<option value="2">小于</option>
				<option value="3">大于等于</option>
                <option value="4">小于等于</option>
			</select>
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
                num: null,
                compare: null
            }, this.condition.detail)
        },
    }
</script>