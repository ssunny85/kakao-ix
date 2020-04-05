import { shallowMount } from '@vue/test-utils';
import Todo from '@/views/Todo/index.vue';

describe('views Todo.vue', () => {
  it('todos가 빈배열일 경우 데이터 없음 테스트', () => {
    const wrapper = shallowMount(Todo, {
      data() {
        return {
          todos: [],
        };
      },
    });
    const todos = wrapper.findAll('.todo__list li');
    expect(todos.at(0).text()).toBe('데이터가 없습니다.');
  });

  it('todos의 item의 갯수가 배열 length와 같은지 테스트', () => {
    const wrapper = shallowMount(Todo, {
      data() {
        return {
          todos: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
          ],
        };
      },
    });
    const todos = wrapper.findAll('.todo__list li');
    expect(todos.length).toBe(3);
  });
});
