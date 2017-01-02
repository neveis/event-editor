<template>
<div class="scroll-map">
	<ul>
		<li>
			<label>中心坐标</label>
			<ul>
				<li>
					<label>x</label><input type="text" v-model.number="subEvent.detail.centerPos.x">
				</li>
				<li>
					<label>y</label><input type="text" v-model.number="subEvent.detail.centerPos.y">
				</li>
			</ul>
		</li>
		<li>
			<label>滚动</label>
			<input type="checkbox" v-model="subEvent.detail.scroll">
		</li>
        <li>
			<label>滚动速度</label>
			<input type="text" v-model.number="subEvent.detail.speed">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'scroll-map',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                centerPos: {
                    x: null,
                    y: null
                },
                speed: 1,
                scroll: true
            }, this.subEvent.detail)
        },
    }
</script>