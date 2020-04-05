import { shallowMount } from '@vue/test-utils';
import TodoSearch from '@/components/TodoSearch/index.vue';

describe('TodoSearch.vue', () => {
  it('data searchType 체크', () => {
    const wrapper = shallowMount(TodoSearch, {
      data() {
        return {
          searchType: 'content',
        };
      },
    });
    const select = wrapper.find('select');
    const selectedOption = select.element.value;
    expect(selectedOption).toBe('content');
  });

  it('data searchText 체크', () => {
    const wrapper = shallowMount(TodoSearch, {
      data() {
        return {
          searchText: '검색어 입력',
        };
      },
    });
    const text = wrapper.find('#search-text');
    expect(text.element.value).toBe('검색어 입력');
  });

  it('data completed 체크', () => {
    // given
    const completed = true;

    // when
    const wrapper = shallowMount(TodoSearch, {
      data() {
        return {
          completed,
        };
      },
    });

    // then
    const result = wrapper.find('#completed-status');
    expect(result.element.checked).toBe(true);
  });

  it('method handleSearch 테스트', () => {
    const wrapper = shallowMount(TodoSearch);
    const condition = {
      type: 'content',
      text: '',
      completed: false,
    };
    wrapper.vm.handleSearch();
    expect(wrapper.emitted()['search-todo'][0]).toEqual([condition]);
  });
});
