<template>
<div class="show-emotion">
	<ul>
        <li>
			<label>角色ID</label>
			<input type="text" v-model="subEvent.detail.actorId">
		</li>
        <li>
			<label>表情</label>
			<select v-model="subEvent.detail.emotionName">
                <option value="surprised">惊讶</option>
                <option value="doubt">疑惑</option>
                <option value="joyful">愉悦</option>
                <option value="like">动心</option>
                <option value="angry">愤怒</option>
                <option value="ashamed">汗颜</option>
                <option value="tangle">纠结</option>
                <option value="silent">沉默</option>
                <option value="inspired">灵感</option>
                <option value="sleep">睡觉</option>
            </select>
		</li>
        <li>
			<label>等待完成</label>
			<input type="checkbox" v-model="subEvent.detail.wait">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'show-emotion',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                actorId: '',
                emotionName: '',
                wait: true,
            }, this.subEvent.detail)
        },
    }
</script>