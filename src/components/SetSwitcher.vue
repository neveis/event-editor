<template>
<div class="set-switcher">
	<ul>
		<li>
			<label>开关ID</label>
			<input type="text" v-model="subEvent.detail.switcherId">
		</li>
		<li>
			<label>开启</label>
			<input type="checkbox" v-model="subEvent.detail.flag">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'set-switcher',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                switcherId: '',
                flag: true
            }, this.subEvent.detail)
        },
    }
</script>