import { shallowMount } from '@vue/test-utils';
import TodoPagination from '@/components/TodoPagination/index.vue';

describe('TodoPagination.vue', () => {
  const propsData = {
    paging: {
      no: 1,
      limit: 3,
      total: 5,
    },
  };
  it('pages computed 체크', () => {
    expect(TodoPagination.computed.pages.call(propsData)).toEqual([1, 2]);
  });

  it('view pages 체크', () => {
    const wrapper = shallowMount(TodoPagination, {
      propsData,
    });
    const results = [];
    const wrapperArray = wrapper.findAll('.todo-pagination__link');
    for (let i = 0; i < wrapperArray.length; i += 1) {
      results.push(wrapperArray.at(i).text().trim());
    }
    expect(results).toEqual(['1', '2']);
  });
});
