<template>
<div class="show-emotion">
	<ul>
        <li>
			<label>事件ID</label>
			<input type="text" v-model="subEvent.detail.eventId">
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
                eventId: ''
            }, this.subEvent.detail)
        },
    }
</script>