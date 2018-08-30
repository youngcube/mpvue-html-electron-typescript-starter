import { GetterTree, ActionTree, MutationTree, Module, Getter } from 'vuex'
import { RootState } from '@/store/modules/types'

export interface UserState {
  userName: string
  userId: string
  userAvatar: string
}

export interface UserActionTree extends ActionTree<UserState, RootState> {}

export interface UserMutationTree extends MutationTree<UserState> {}

export interface UserGetterTree extends GetterTree<UserState, RootState> {
  getUserName: Getter<UserState, RootState>
  getUserAvatar: Getter<UserState, RootState>
  isLogin: Getter<UserState, RootState>
}

export interface UserStoreModule extends Module<UserState, RootState> {
  namespaced: boolean
  state: UserState
  getters: UserGetterTree
  actions: UserActionTree
  mutations: UserMutationTree
}
