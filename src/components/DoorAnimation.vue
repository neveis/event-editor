<template>
<div class="door-animation">
	<ul>
		<li>
			<label>门的左下角坐标</label>
			<ul>
				<li>
					<label>x</label><input type="text" v-model.number="subEvent.detail.pos.x">
				</li>
				<li>
					<label>y</label><input type="text" v-model.number="subEvent.detail.pos.y">
				</li>
			</ul>
		</li>
        <li>
			<label>左下角图块GID</label>
			<input type="text" v-model.number="subEvent.detail.firstGid">
		</li>
	</ul>
</div>
</template>

<script>
    export default {
        name: 'door-animation',
        props: ['subEvent'],
        created: function() {
            this.subEvent.detail = Object.assign({
                firstGid: null,
                pos: {
                    x: null,
                    y: null
                }
            }, this.subEvent.detail)
        },
    }
</script>