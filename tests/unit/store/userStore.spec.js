import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/store/userStore'
import userService from '@/services/userService'

jest.mock('@/services/userService.js')

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    jest.clearAllMocks()
  })

  it('fetches users and updates state correctly', async () => {
    const store = useUserStore()
    const mockUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ]

    userService.getUsers.mockResolvedValue(mockUsers)

    expect(store.isLoadingList).toBe(false)
    expect(store.users).toEqual([])

    await store.fetchUsers()

    expect(store.isLoadingList).toBe(false)
    expect(store.users).toEqual(mockUsers)
    expect(store.errorList).toBeNull()
    expect(userService.getUsers).toHaveBeenCalledTimes(1)
  })

  it('handles error when fetching users', async () => {
    const store = useUserStore()
    const errorMessage = 'Network Error'
    userService.getUsers.mockRejectedValue(new Error(errorMessage))

    await store.fetchUsers()

    expect(store.isLoadingList).toBe(false)
    expect(store.users).toEqual([])
    expect(store.errorList).toBe(errorMessage)
  })

  it('fetches a single user by ID and updates state', async () => {
    const store = useUserStore()
    const mockUser = { id: 1, name: 'Specific User' }
    const userId = 1
    userService.getUserById.mockResolvedValue(mockUser)

    await store.fetchUserById(userId)

    expect(store.isLoadingDetail).toBe(false)
    expect(store.currentUser).toEqual(mockUser)
    expect(store.errorDetail).toBeNull()
    expect(userService.getUserById).toHaveBeenCalledWith(userId)
  })

  it('handles error when fetching a single user', async () => {
    const store = useUserStore()
    const errorMessage = 'User not found'
    const userId = 999
    userService.getUserById.mockRejectedValue(new Error(errorMessage))

    await store.fetchUserById(userId)

    expect(store.isLoadingDetail).toBe(false)
    expect(store.currentUser).toBeNull()
    expect(store.errorDetail).toBe(errorMessage)
  })

  it('clearCurrentUser resets currentUser and errorDetail', () => {
    const store = useUserStore()
    store.currentUser = { id: 1, name: 'Test User' }
    store.errorDetail = 'Some error'

    store.clearCurrentUser()

    expect(store.currentUser).toBeNull()
    expect(store.errorDetail).toBeNull()
  })
})
