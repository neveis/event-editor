<template>
<div class="actor-move">
	<ul>
		<li>
			<label>角色ID</label>
			<input type="text" v-model="subEvent.detail.actorId">
		</li>
		<li>
			<label>移动格数</label>
			<input type="text" v-model.number="subEvent.detail.step">
		</li>
		<li>
			<label>移动速度</label>
			<input type="text" v-model.number="subEvent.detail.speed">
		</li>
		<li>
			<label>等待完成</label>
			<input type="checkbox" v-model="subEvent.detail.wait">
		</li>
		<li>
			<label>方向</label>
			<select v-model.number="subEvent.detail.direction">
				<option value="8">上</option>
				<option value="2">下</option>
				<option value="4">左</option>
				<option value="6">右</option>
				<option value="1">左下</option>
                <option value="3">右下</option>
                <option value="7">左上</option>
                <option value="9">右上</option>
			</select>
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'actor-move',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                actorId: '',
                step: 1,
                direction: 8,
                speed: 1,
                wait: true
            }, this.subEvent.detail)
        },
    }
</script>