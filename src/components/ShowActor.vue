<template>
<div class="show-actor">
	<ul>
		<li>
			<label>角色ID</label>
			<input type="text" v-model="subEvent.detail.actorId">
		</li>
		<li>
			<label>显示</label>
			<input type="checkbox" v-model="subEvent.detail.active">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'show-actor',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                actorId: '',
                active: false
            }, this.subEvent.detail)
        },
    }
</script>