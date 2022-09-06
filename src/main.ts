import type _Vue from 'vue';
import VMasonryItem from './components/VMasonryItem';

const VueMasonry = {
  install (Vue: typeof _Vue) {
    Vue.component(VMasonryItem.name, VMasonryItem);

    Vue.prototype.$masonry = {}
  }
}

export default VueMasonry

if (window?.Vue) {
  window.Vue.use(VueMasonry)
}