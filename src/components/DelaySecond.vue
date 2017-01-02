<template>
<div class="delay-second">
	<ul>
		<li>
            <label>延迟（秒）</label>
			<input type="text" v-model.number="subEvent.detail.second">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'delay-second',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                second: null,
            }, this.subEvent.detail)
        },
    }
</script>