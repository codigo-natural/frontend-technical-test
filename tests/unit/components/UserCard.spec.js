import { mount } from '@vue/test-utils'
import UserCard from '@/components/UserCard.vue'

describe('UserCard.vue', () => {
  const mockUser = {
    id: 1,
    name: 'Leanne Graham',
    email: 'Sincere@april.biz',
    username: 'Bret',
  }

  // Stub para router-link
  const RouterLinkStub = {
    template:
      "<a :href=\"to.name === 'userDetail' ? `/users/${to.params.id}` : '#'\"><slot /></a>",
    props: ['to'],
  }

  it('renders user name, email and username', () => {
    const wrapper = mount(UserCard, {
      props: { user: mockUser },
      global: {
        stubs: {
          'router-link': RouterLinkStub,
          'font-awesome-icon': true,
        },
      },
    })
    expect(wrapper.text()).toContain(mockUser.name)
    expect(wrapper.text()).toContain(mockUser.email)
    expect(wrapper.text()).toContain(mockUser.username)
  })

  it('contains a link to the user detail page', () => {
    const wrapper = mount(UserCard, {
      props: { user: mockUser },
      global: {
        stubs: {
          'router-link': RouterLinkStub,
          'font-awesome-icon': true,
        },
      },
    })
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.exists()).toBe(true)
    // verificMOS LA PROP 'to'
    expect(link.props().to).toEqual({
      name: 'userDetail',
      params: { id: mockUser.id },
    })
  })
})
