<template>
<div class="map-animation">
	<ul>
		<li>
			<label>clip名称</label>
			<input type="text" v-model="subEvent.detail.clipName">
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
        name: 'map-animation',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                clipName: '',
                wait: true
            }, this.subEvent.detail)
        },
    }
</script>