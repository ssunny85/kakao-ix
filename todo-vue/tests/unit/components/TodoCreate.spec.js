import { shallowMount } from '@vue/test-utils';
import TodoCreate from '@/components/TodoCreate/index.vue';
import TodoApi from '@/api/todo';

describe('TodoCreate.vue', () => {
  it('todo content 가 있을 경우 추가 버튼 활성화', () => {
    const wrapper = shallowMount(TodoCreate, {
      data() {
        return {
          content: 'Todo item 1',
        };
      },
    });
    const result = wrapper.find('.button').attributes('disabled');
    expect(result).toBeUndefined();
  });
  it('todo content 가 있을 경우 추가 버튼 비활성화', () => {
    const wrapper = shallowMount(TodoCreate, {
      data() {
        return {
          content: '',
        };
      },
    });
    const result = wrapper.find('.button').attributes('disabled');
    expect(result).toBe('disabled');
  });
  it('method handleAddItem 실행', async () => {
    // given
    const wrapper = shallowMount(TodoCreate, {
      data() {
        return {
          content: 'test',
        };
      },
    });
    TodoApi.create = jest.fn().mockResolvedValue({});

    // when
    wrapper.vm.handleAddItem();
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.emitted()['refresh-todo'][0]).toEqual([]);
    expect(wrapper.vm.content).toBe('');
  });
});
