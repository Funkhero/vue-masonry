# vue-masonry

## Get started
```
npm i vue-masonry-item --save
```

## Add component to your app
```
import Vue from 'vue';
import { VueMasonryItem } from 'vue-masonry-item';

Vue.use(VueMasonryItem)

<div class="my-gallery">
  <vue-masonry-item
    v-for="item in masonryItems"
    :key="item.id"
    :item="item"
  />
<div/>
```

## Properties
- ```item="{ url: string; id: string | number; title?: string }"``` - list item;
- ```row-height="number" | default 0``` - height of items row;
- ```row-gap="number" | default 8``` - rows gap in px;
- ```item-tag="string" | default 'div'``` - item tag;
- ```sizes="{ big: number; avg: number; small: number }" | default { big: 500, avg: 410, small: 320 }``` - sizes of items, to beautifully distribute items sizes depending on the pictures content;
