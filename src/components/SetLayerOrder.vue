<template>
<div class="set-layer-order">
	<ul>
		<li>
			<label>角色ID</label>
			<input type="text" v-model="subEvent.detail.actorId">
		</li>
		<li>
			<label>方向优先级</label>
			<select v-model.number="subEvent.detail.order">
				<option value="0">角色下方</option>
				<option value="1">角色同层</option>
				<option value="2">角色上方</option>
			</select>
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'set-layer-order',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                actorId: '',
                order: 1
            }, this.subEvent.detail)
        },
    }
</script>