import wx from '@/utils/wx'
import { wxp } from '@minapp/wx/wxp'
namespace UIUtils {
  export function isDebug(): boolean {
    return process.env.NODE_ENV !== 'production'
  }

  export function getAssetFile(filename: string) {
    if (wx) {
      return `/static/assets/${filename}`
    }
    return `./static/assets/${filename}`
  }

  export function showAlert(text: string, title: string = '提示') {
    if (wx) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: text,
      })
    } else {
      if (isDebug()) {
        dLog(text)
      } else {
        alert(text)
      }
    }
  }

  export function dLog(log: string) {
    if (!isDebug()) {
      return
    }
    /* tslint:disable */
    console.log(log)
  }
}

export default UIUtils
