<template>
<div class="change-sprite">
	<ul>
		<li>
			<label>角色ID</label>
			<input type="text" v-model="subEvent.detail.actorId">
		</li>
		<li>
			<label>图像名称</label>
			<input type="text" v-model="subEvent.detail.spriteName">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'change-sprite',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                actorId: '',
                spriteName: ''
            }, this.subEvent.detail)
        },
    }
</script>