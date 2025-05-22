import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import UserListView from '@/views/UserListView.vue'
import UserCard from '@/components/UserCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useUserStore } from '@/store/userStore'
import { nextTick } from 'vue'

const RouterLinkStub = {
  template:
    "<a :href=\"to.name === 'userDetail' ? `/users/${to.params.id}` : '#'\"><slot /></a>",
  props: ['to'],
}

describe('UserListView.vue', () => {
  let pinia

  beforeEach(() => {
    pinia = createTestingPinia({
      initialState: {
        user: {
          users: [],
          isLoadingList: false,
          errorList: null,
        },
      },
      stubActions: false,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('render loading spinner when isLoadingList is true', () => {
    const store = useUserStore(pinia)
    store.isLoadingList = true

    const wrapper = mount(UserListView, {
      global: {
        plugins: [pinia],
        stubs: {
          'router-link': RouterLinkStub,
          UserCard,
          'font-awesome-icon': true,
        },
      },
    })
    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true)
  })

  it('renders error message when errorList is present', () => {
    const store = useUserStore(pinia)
    store.errorList = 'Failed to load'

    const wrapper = mount(UserListView, {
      global: {
        plugins: [pinia],
        stubs: {
          'router-link': RouterLinkStub,
          'font-awesome-icon': true,
        },
      },
    })
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true)
    expect(wrapper.findComponent(ErrorMessage).props().message).toBe(
      'Failed to load'
    )
  })

  jest.mock('@/services/userService', () => ({
    getUsers: jest.fn().mockResolvedValue([]),
  }))

  it('renders user cards when users are available', async () => {
    const store = useUserStore(pinia)

    // eslint-disable-next-line
    const fetchUsersSpy = jest
      .spyOn(store, 'fetchUsers')
      .mockImplementation(async () => {})

    store.users = [
      { id: 1, name: 'User 1', email: 'u1@test.com', username: 'u1' },
      { id: 2, name: 'User 2', email: 'u2@test.com', username: 'u2' },
    ]

    store.isLoadingList = false
    store.errorList = null

    const wrapper = mount(UserListView, {
      global: {
        plugins: [pinia],
        stubs: {
          'router-link': RouterLinkStub,
          'font-awesome-icon': true,
        },
      },
    })

    await nextTick()

    const userCards = wrapper.findAllComponents(UserCard)
    expect(userCards.length).toBe(2)
    expect(userCards[0].props().user).toEqual(store.users[0])
  })

  it('calls fetchUser action on mounted', () => {
    const testPinia = createTestingPinia({
      createSpy: jest.fn,
      stubActions: false,
    })
    const store = useUserStore(testPinia)

    mount(UserListView, {
      global: {
        plugins: [testPinia],
        stubs: {
          'router-link': RouterLinkStub,
          'font-awesome-icon': true,
        },
      },
    })
    expect(store.fetchUsers).toHaveBeenCalledTimes(1)
  })

  it('shows "No users found" message when list is empty and not loading/error', () => {
    const wrapper = mount(UserListView, {
      global: {
        plugins: [pinia],
        stubs: {
          'router-link': RouterLinkStub,
          'font-awesome-icon': true,
        },
      },
    })
    expect(wrapper.text()).toContain('No users found.')
  })
})
