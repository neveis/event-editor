<template>
<div class="move-animation">
	<ul>
		<li>
			<label>角色ID</label>
			<input type="text" v-model="subEvent.detail.actorId">
		</li>
		<li>
			<label>移动速度</label>
			<input type="text" v-model.number="subEvent.detail.speed">
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
        <li>
			<label>状态</label>
			<select v-model.number="subEvent.detail.state">
				<option value="0">停止</option>
				<option value="1">启动</option>
			</select>
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'move-animation',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                actorId: '',
                direction: 8,
                speed: 1,
                state: 1
            }, this.subEvent.detail)
        },
    }
</script>