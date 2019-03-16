<template>
<Page class="page">
    <ActionBar class="action-bar">
        <Label class="action-bar-title" text="15 Puzzle"></Label>
    </ActionBar>
    <FlexboxLayout id="container" @swipe="onSwipe">
        <Label v-for="{index, text} in numbers" :key="index" :text="text" :class="{ empty: text === 16 }" />
    </FlexboxLayout>
</Page>
</template>

<script>
import { SwipeDirection } from "tns-core-modules/ui/gestures";

export default {
    data () {
        return {
            numbers: [
                { index: 0, text: 1 },
                { index: 1, text: 2 },
                { index: 2, text: 3 },
                { index: 3, text: 4 },
                { index: 4, text: 5 },
                { index: 5, text: 6 },
                { index: 6, text: 7 },
                { index: 7, text: 8 },
                { index: 8, text: 9 },
                { index: 9, text: 10 },
                { index: 10, text: 11 },
                { index: 11, text: 12 },
                { index: 12, text: 13 },
                { index: 13, text: 15 },
                { index: 14, text: 14 },
                { index: 15, text: 16 },
            ],
        };
    },
    methods: {
        onSwipe(event) {
            const index = this.numbers.map(el => {
                return { index: el.index, text: el.text };
            }).findIndex(el => el.text === 16);
            console.log(`index: ${index}, direction: ${event.direction}`);

            const direction = event.direction;
            if (direction === SwipeDirection.left && index % 4 !== 3) {
                this.swipeLeft(index + 1);
            } else if (direction === SwipeDirection.right && index % 4 !== 0) {
                this.swipeRight(index - 1);
            } else if (direction === SwipeDirection.up && Math.floor(index / 4) !== 3) {
                this.swipeUp(index + 4);
            } else if (direction === SwipeDirection.down && Math.floor(index / 4) !== 0) {
                this.swipeDown(index - 4);
            }
        },
        swipeLeft(index) {
            const leftIndex = index - 1;
            if (this.numbers[leftIndex].text !== 16) return;
            const tmp = this.numbers[index].text;
            this.numbers[index].text = this.numbers[leftIndex].text;
            this.numbers[leftIndex].text = tmp;
        },
        swipeRight(index) {
            const rightIndex = index + 1;
            if (this.numbers[rightIndex].text !== 16) return;
            const tmp = this.numbers[index].text;
            this.numbers[index].text = this.numbers[rightIndex].text;
            this.numbers[rightIndex].text = tmp;
        },
        swipeUp(index) {
            const upIndex = index - 4;
            if (this.numbers[upIndex].text !== 16) return;
            const tmp = this.numbers[index].text;
            this.numbers[index].text = this.numbers[upIndex].text;
            this.numbers[upIndex].text = tmp;
        },
        swipeDown(index) {
            const downIndex = index + 4;
            if (this.numbers[downIndex].text !== 16) return;
            const tmp = this.numbers[index].text;
            this.numbers[index].text = this.numbers[downIndex].text;
            this.numbers[downIndex].text = tmp;
        }
    }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import '../app-variables';
// End custom common variables

// Custom styles
.fa {
    color: $accent-dark;
}

.info {
    font-size: 20;
}

* > #container {
    background-color: #555555;
}

#container {
    height: 360dpi;
    width: 360dpi;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #555555;
    z-index: -2;
}

#container > * {
    font-size: 32;
    text-align: center;
    background-color: red;
    margin: 5;
    height: 75;
    width: 75;
    border-radius: 5;

    transition: 1s linear 0;
}

#container > .empty {
    background-color: #555555;
    color: #555555;
    z-index: -1;
}

</style>
