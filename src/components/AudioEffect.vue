<template>
<div class="audio-effect">
	<ul>
        <li>
			<label>音效名称</label>
			<input type="text" v-model="subEvent.detail.audioName">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'audio-effect',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                audioName: '',
            }, this.subEvent.detail)
        },
    }
</script>