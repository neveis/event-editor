<template>
<div class="lock-ui">
	<ul>
		<li>
			<label>锁定</label>
			<input type="checkbox" v-model="subEvent.detail.lock">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'lock-ui',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                lock: true
            }, this.subEvent.detail)
        },
    }
</script>