import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import UserDetailView from '@/views/UserDetailView.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { useUserStore } from '@/store/userStore'

const RouterLinkStub = {
  name: 'RouterLink',
  template: "<a :href=\"to === '/' ? '/' : '#'\"><slot /></a>",
  props: ['to'],
}

const FontAwesomeIconStub = {
  name: 'FontAwesomeIcon',
  template: "<i :class=\"icon ? icon.join(' ') : ''\"></i>",
  props: ['icon'],
}

const mockUserId = '1'
const mockUser = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: { lat: '-37.3159', lng: '81.1496' },
  },
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
}

describe('UserDetailView.vue', () => {
  let pinia
  let userStore

  const createWrapper = (props = {}, storeState = {}) => {
    pinia = createTestingPinia({
      createSpy: jest.fn,
      initialState: {
        user: {
          currentUser: null,
          isLoadingDetail: false,
          errorDetail: null,
          ...storeState,
        },
      },
      stubActions: false,
    })
    userStore = useUserStore(pinia)

    const wrapper = mount(UserDetailView, {
      propsData: {
        id: mockUserId,
        ...props,
      },
      global: {
        plugins: [pinia],
        stubs: {
          'router-link': RouterLinkStub,
          'font-awesome-icon': FontAwesomeIconStub,
          LoadingSpinner,
          ErrorMessage,
        },
      },
    })

    if (storeState.currentUser) {
      userStore.currentUser = storeState.currentUser
    }

    return wrapper
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls fetchUserById with correct id on mount', () => {
    createWrapper()
    expect(userStore.fetchUserById).toHaveBeenCalledTimes(1)
    expect(userStore.fetchUserById).toHaveBeenCalledWith(mockUserId)
  })

  it('calls clearCurrentUser on unmount', () => {
    const wrapper = createWrapper()
    wrapper.unmount()
    expect(userStore.clearCurrentUser).toHaveBeenCalledTimes(1)
  })

  it('displays loading spinner when isLoadingDetail is true', () => {
    const wrapper = createWrapper({}, { isLoadingDetail: true })
    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(true)
    expect(wrapper.find('.user-details-display').exists()).toBe(false)
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false)
    expect(wrapper.find('.empty-container').exists()).toBe(false)
  })

  it('displays error message when errorDetail is present', () => {
    const errorMessageText = 'Failed to load user details.'
    const wrapper = createWrapper({}, { errorDetail: errorMessageText })

    const errorComponent = wrapper.findComponent(ErrorMessage)
    expect(errorComponent.exists()).toBe(true)
    expect(errorComponent.props('message')).toBe(errorMessageText)

    expect(wrapper.find('.user-details-display').exists()).toBe(false)
    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(false)
    expect(wrapper.find('.empty-container').exists()).toBe(false)
  })

  describe('when currentUser is available', () => {
    let wrapper

    beforeEach(async () => {
      wrapper = createWrapper({}, { currentUser: mockUser })
      await wrapper.vm.$nextTick()
    })

    it('renders user details display section', () => {
      expect(wrapper.find('.user-details-display').exists()).toBe(true)
      expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(false)
      expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false)
      expect(wrapper.find('.empty-container').exists()).toBe(false)
    })

    it('displays user name and username', () => {
      expect(wrapper.find('.user-identity h2').text()).toBe(mockUser.name)
      expect(wrapper.find('.user-identity .username').text()).toBe(
        `@${mockUser.username}`
      )
    })

    it('computes and displays user initials correctly for two-part name', () => {
      expect(wrapper.find('.user-avatar span').text()).toBe('LG')
    })

    it('computes and displays user initials correctly for one-part name', async () => {
      const onePartNameUser = { ...mockUser, name: 'Cher' }
      userStore.currentUser = onePartNameUser
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.user-avatar span').text()).toBe('C')
    })

    it('computes and displays user initials correctly for name with more than two parts', async () => {
      const multiPartNameUser = { ...mockUser, name: 'Mary Anne Smith' }
      userStore.currentUser = multiPartNameUser
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.user-avatar span').text()).toBe('MA')
    })

    it('displays contact information', () => {
      const contactItems = wrapper.findAll(
        '.detail-section:nth-child(1) .detail-item'
      )
      expect(contactItems[0].text()).toContain('Email')
      expect(contactItems[0].text()).toContain(mockUser.email)
      expect(contactItems[1].text()).toContain('Phone')
      expect(contactItems[1].text()).toContain(mockUser.phone)
      expect(contactItems[2].text()).toContain('Website')
      expect(contactItems[2].find('a').attributes('href')).toBe(
        `http://${mockUser.website}`
      )
      expect(contactItems[2].find('a').text()).toBe(mockUser.website)
    })

    it('displays address information', () => {
      const addressSection = wrapper.find('.detail-section:nth-child(2)')
      expect(addressSection.text()).toContain(mockUser.address.street)
      expect(addressSection.text()).toContain(mockUser.address.suite)
      expect(addressSection.text()).toContain(mockUser.address.city)
      expect(addressSection.text()).toContain(mockUser.address.zipcode)
      expect(addressSection.text()).toContain(mockUser.address.geo.lat)
      expect(addressSection.text()).toContain(mockUser.address.geo.lng)
    })

    it('displays company information', () => {
      const companySection = wrapper.find('.detail-section:nth-child(3)')
      expect(companySection.find('h4').text()).toBe(mockUser.company.name)
      expect(companySection.find('.company-bs').text()).toBe(
        mockUser.company.bs
      )
      expect(companySection.find('.company-catchphrase p').text()).toBe(
        mockUser.company.catchPhrase
      )
    })

    it('renders the back link correctly', () => {
      const backLink = wrapper.findComponent(RouterLinkStub)
      expect(backLink.exists()).toBe(true)
      expect(backLink.props('to')).toBe('/')
      expect(backLink.text()).toContain('Back to Users')
    })
  })

  it('displays "User data not available" when no user, no loading, and no error', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.empty-container').exists()).toBe(true)
    expect(wrapper.find('.empty-container p').text()).toBe(
      'User data not available.'
    )

    expect(wrapper.find('.user-details-display').exists()).toBe(false)
    expect(wrapper.findComponent(LoadingSpinner).exists()).toBe(false)
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false)
  })
})
