<template>
<div class="change-atlas">
	<ul>
		<li>
			<label>角色ID</label>
			<input type="text" v-model="subEvent.detail.actorId">
		</li>
		<li>
			<label>路径</label>
			<input type="text" v-model="subEvent.detail.atlasPath">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'change-atlas',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                actorId: '',
                atlasPath: ''
            }, this.subEvent.detail)
        },
    }
</script>