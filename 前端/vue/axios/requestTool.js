/*
 * @Author: DuFeng
 * @Date: 2021-09-07 15:57:43
 * @LastEditTime: 2021-09-09 12:46:35
 * @Description: 
 * @FilePath: \emer-front\src\service\lib\requestTool.js
 *  
 */
import request from '@/service/lib/request2';
import {
  Loading
} from 'element-ui';
import {
  Message
} from 'element-ui';

async function req(param, errText, hint, isLoading) {
  if (isLoading) {
    let loadingInstance1 = Loading.service({
      fullscreen: true,
      text: hint,
      lock: true
    });
    let res = await request(param).then((res) => {
      loadingInstance1.close();
      return res;
    }).catch((e) => {
      console.log(e);
      loadingInstance1.close();
      Message.error({
        message: errText,
        duration: 1500
      });
      return null;
    });
    return res;
  } else {
    let res = await request(param).then((res) => {
      return res;
    }).catch((e) => {
      console.log(e);
      Message.error({
        message: errText,
        duration: 1500
      });
      return null;
    });
    return res;
  }
}
function reqCom(param, errText, hint , isLoading ) {
  return req(param, errText, hint, isLoading);
}
function reqList(param, errText = '查询列表失败！', hint = '正在加载', isLoading = true) {
  return req(param, errText, hint, isLoading);
}
function reqAdd(param, errText = '添加失败！', hint = '正在添加', isLoading = true) {
  return req(param, errText, hint, isLoading);
}
function reqUpdate(param, errText = '修改失败！', hint = '正在修改', isLoading = true) {
  return req(param, errText, hint, isLoading);
}
function reqDel(param, errText = '删除失败！', hint = '正在删除', isLoading = true) {
  return req(param, errText, hint, isLoading);
}
function reqDetail(param, errText = '查询详情失败！', hint = '正在加载', isLoading = true) {
  return req(param, errText, hint, isLoading);
}

const reqTool = {
  reqList,
  reqAdd,
  reqUpdate,
  reqDel,
  reqDetail,
  reqCom
};
export default reqTool;