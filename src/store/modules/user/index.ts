import {
  UserState,
  UserActionTree,
  UserMutationTree,
  UserGetterTree,
  UserStoreModule,
} from '@/store/modules/user/types'

const state: UserState = {
  userName: '',
  userId: '',
  userAvatar: '',
}

const getters: UserGetterTree = {
  getUserName(state): string {
    return state.userName
  },
  getUserAvatar(state): string {
    return state.userAvatar
  },
  isLogin(state): boolean {
    return state.userId.length > 0
  },
}

const actions: UserActionTree = {}

const mutations: UserMutationTree = {}

const namespaced: boolean = true

export const user: UserStoreModule = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
