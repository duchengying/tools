/*
 * @Author: DuFeng
 * @Date: 2021-09-07 15:57:43
 * @LastEditTime: 2021-09-09 13:41:47
 * @Description: 
 * @FilePath: \tools\前端\vue\axios\requestTool.js
 *  
 */
import request from '@/service/lib/request2';
import {
  Loading
} from 'element-ui';
import {
  Message
} from 'element-ui';

/* 
  功能：请求封装
 参数：{ param：请求参数对象，
  例如：{
        url: "/api/enforcement/pageEnforcement",
        method: 'post',
        data: params
    }
    其他参数参照axios。

    errText：错误提示语，发生错误是，给用户展示的提示信息。
    isLoading:是否显示加载提示。
    hint：加载提示语。
  }
*/
async function req(param, errText,isLoading,hint) {
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

/* 
通用请求
*/
function reqCom(param, errText, hint , isLoading ) {
  return req(param, errText, isLoading, hint);
}
/* 
用于请求列表信息
*/
function reqList(param, errText = '查询列表失败！', isLoading = true, hint = '正在加载') {
  return req(param, errText, isLoading, hint);
}
/* 
用于请求添加信息
*/
function reqAdd(param, errText = '添加失败！', isLoading = true, hint = '正在添加') {
  return req(param, errText, isLoading, hint);
}
/* 
用于请求修改信息
*/
function reqUpdate(param, errText = '修改失败！', isLoading = true, hint = '正在修改') {
  return req(param, errText, isLoading, hint);
}
/* 
用于请求删除信息
*/
function reqDel(param, errText = '删除失败！', isLoading = true, hint = '正在删除') {
  return req(param, errText, isLoading, hint);
}
/* 
用于请求详情信息
*/
function reqDetail(param, errText = '查询详情失败！', isLoading = true, hint = '正在加载') {
  return req(param, errText, isLoading, hint);
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