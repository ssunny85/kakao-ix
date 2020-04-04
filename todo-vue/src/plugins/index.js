import Vue from 'vue';
import VueMeta from 'vue-meta';
import Toasted from 'vue-toasted';

const options = {
  position: 'top-center',
  containerClass: 'toast-wrap',
  duration: 2000,
};

Vue.use(VueMeta);
Vue.use(Toasted, options);
