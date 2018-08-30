import { Vue, Component, Prop } from 'vue-property-decorator'
import { AppUrls } from '@/utils/consts'

@Component
export default class Index extends Vue {
  // 保证 *.vue 文件可以用到
  @Prop({ default: () => AppUrls })
  public AppUrls: string

  public onShow() {}

  public onShareAppMessage() {}
}
