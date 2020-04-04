import { shallowMount } from '@vue/test-utils';
import TodoItem from '@/components/TodoItem/index.vue';
import TodoApi from '@/api/todo';

describe('TodoItem.vue', () => {
  let wrapper;
  const todo = {
    id: 1,
    content: 'item 1',
    createdAt: '2020-03-28T11:54:23.414Z',
    updatedAt: '2020-04-04T07:56:08.413Z',
    referenceIds: '2, 3',
    completed: true,
  };
  beforeEach(() => {
    wrapper = shallowMount(TodoItem, {
      propsData: {
        todo,
      },
      mocks: {
        $toasted: {},
      },
    });
  });

  it('todo props 체크', () => {
    expect(wrapper.find('.todo-item__completed').element.checked).toBe(true);
    expect(wrapper.find('.todo-item__title').text()).toBe('item 1');
    expect(wrapper.find('.todo-item__id em').text()).toBe('1');
    expect(wrapper.find('.todo-item__created em').text()).toBe('2020-03-28');
    expect(wrapper.find('.todo-item__updated em').text()).toBe('2020-04-04');
    expect(wrapper.find('.todo-item__ref em').text()).toBe('@2, @3');
  });

  it('method handleDelete 테스트', async () => {
    // given
    TodoApi.delete = jest.fn().mockResolvedValue({});

    // when
    wrapper.vm.handleDelete();
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.emitted()['refresh-todo'][0]).toEqual([]);
  });

  it('method handleSubmit 성공 시 테스트', async () => {
    // given
    TodoApi.update = jest.fn().mockResolvedValue({});

    // when
    wrapper.vm.handleSubmit();
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.emitted()['update-todo'][0]).toEqual([]);
    expect(wrapper.vm.isUpdate).toBeFalsy();
  });

  it('method handleSubmit 실패 시 테스트', async () => {
    // given
    TodoApi.update = jest.fn().mockRejectedValue({
      response: {
        data: {
          errorMsg: '에러',
        },
      },
    });
    wrapper.vm.$toasted.show = jest.fn();

    // when
    const result = await wrapper.vm.handleSubmit();
    await wrapper.vm.$nextTick();

    // then
    expect(wrapper.vm.$toasted.show).toBeCalled();
    expect(result).toBeFalsy();
  });

  it('method handleUpdate 테스트', () => {
    wrapper.vm.handleUpdate();
    expect(wrapper.vm.isUpdate).toBeTruthy();
  });
});
