<template>
<div class="set-actor-pos">
	<ul>
		<li>
			<label>角色ID</label>
			<input type="text" v-model.number="subEvent.detail.actorId">
		</li>
		<li>
			<label>位置坐标</label>
			<ul>
				<li>
					<label>x</label><input type="text" v-model.number="subEvent.detail.pos.x">
				</li>
				<li>
					<label>y</label><input type="text" v-model.number="subEvent.detail.pos.y">
				</li>
			</ul>
		</li>
		<li>
			<label>方向</label>
			<select v-model.number="subEvent.detail.direction">
				<option value="8">上</option>
				<option value="2">下</option>
				<option value="4">左</option>
				<option value="6">右</option>
			</select>
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'set-actor-pos',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                actorId: '',
                pos: {
                    x: null,
                    y: null
                },
                direction: 8,
            }, this.subEvent.detail)
        },
    }
</script>