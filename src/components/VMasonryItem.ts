import type { CreateElement } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

export interface IMasonryItem {
  url: string;
  id: string | number;
  title?: string;
}

export interface IMasonrySizes {
  big: number;
  avg: number;
  small: number,
}

@Component
export default class VMasonryItem extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: IMasonryItem;
  @Prop({ type: Number, default: 0 }) rowHeight!: number;
  @Prop({ type: Number, default: 8 }) rowGap!: number;
  @Prop({ type: String, default: 'div' }) itemTag!: string;
  @Prop({ type: Object, default: () => ({ big: 500, avg: 410, small: 320 }) }) sizes!: IMasonrySizes;

  $refs!: {
    masonryItem: HTMLElement;
    masonryPhoto: HTMLElement;
  };

  mounted() {
    window.addEventListener('resize', this.resizeGridItem);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeGridItem);
  }

  getFixedValues(height: number) {
    if (height >= this.sizes.big) return this.sizes.big;
    if (height < this.sizes.big && height > this.sizes.small) return this.sizes.avg;
    return this.sizes.small;
  }

  resizeGridItem() {
    if (!this.$refs.masonryItem || !this.$refs.masonryPhoto) return;

    const imageHeight = this.getFixedValues(this.$refs.masonryPhoto.getBoundingClientRect().height || 0);
    const rowSpan = Math.round((imageHeight + this.rowGap) / (this.rowHeight + this.rowGap));

    this.$refs.masonryItem.style.gridRowEnd = `span ${rowSpan}`;
    this.$refs.masonryItem.style.height = `${imageHeight}px`;
    this.$refs.masonryPhoto.style.height = '100%';
  }

  onItemClick() {
    this.$emit('click', this.item);
  }

  render(create: CreateElement) {
    return create(this.itemTag, {
        ref: 'masonryItem',
        class: 'v-masonry-item',
        on: {
          click: this.onItemClick
        }
      },
      [
        create('img', {
          ref: 'masonryPhoto',
          class: 'v-masonry-item__photo',
          attrs: {
            src: this.item.url,
            alt: `photo ${this.item.id}`,
          },
          style: {
            objectFit: 'cover',
            width: '100%'
          },
          on: {
            load: this.resizeGridItem,
          }
        }),
      ]
    );
  }
}
