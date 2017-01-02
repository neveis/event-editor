<template>
<div class="fade-event">
	<ul>
		<li>
			<label>淡入</label>
			<input type="checkbox" v-model="subEvent.detail.fadeIn">
		</li>
        <li>
			<label>持续时间</label>
			<input type="text" v-model.number="subEvent.detail.duration">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'fade-event',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                fadeIn: true,
                duration: 0
            }, this.subEvent.detail)
        },
    }
</script>