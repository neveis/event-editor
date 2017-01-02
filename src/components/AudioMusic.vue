<template>
<div class="audio-music">
	<ul>
        <li>
			<label>音乐名称</label>
			<input type="text" v-model="subEvent.detail.audioName">
		</li>
        <li>
			<label>循环</label>
			<input type="checkbox" v-model="subEvent.detail.loop">
		</li>
        <li>
			<label>状态</label>
			<select v-model.number="subEvent.detail.state">
				<option value="0">播放</option>
				<option value="1">暂停</option>
				<option value="2">恢复</option>
				<option value="3">停止</option>
			</select>
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'audio-music',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                audioName: '',
                loop: false,
                state: 0
            }, this.subEvent.detail)
        },
    }
</script>