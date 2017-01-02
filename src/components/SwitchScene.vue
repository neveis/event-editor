<template>
<div class="switch-scene">
	<ul>
		<li>
			<label>目的地图ID</label>
			<input type="text" v-model="subEvent.detail.destMapId">
		</li>
		<li>
			<label>控制角色ID</label>
			<input type="text" v-model.number="subEvent.detail.playerId">
		</li>
		<li>
			<label>目的地坐标</label>
			<ul>
				<li>
					<label>x</label><input type="text" v-model.number="subEvent.detail.destPos.x">
				</li>
				<li>
					<label>y</label><input type="text" v-model.number="subEvent.detail.destPos.y">
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
        name: 'switch-scene',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                destMapId: '',
                playerId: 1,
                destPos: {
                    x: null,
                    y: null
                },
                direction: 8,
            }, this.subEvent.detail)
        },
    }
</script>