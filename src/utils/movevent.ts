/*
 * @Author: lduoduo
 * @Date: 2020-07-29 22:32:53
 * @Last Modified by: duoduo
 * @Last Modified time: 2020-11-30 18:12:43
 * 拖拽事件发布订阅总线H5端用MOVE
 */

class MoveEvent {
  data: undefined;
  cbMap: {
    md: Array<any>;
    mm: Array<any>;
    mu: Array<any>;
  };

  constructor() {
    this.cbMap = {
      md: [], // 开始移动
      mm: [], // 移动中
      mu: [] // 停止移动
    };
    this.data = undefined;
  }

  onMouseDown(data: any, cb: any) {
    this.data = data;
    console.log('onMouseDown', data);
    this.cbMap.md.push(cb);
  }

  onMouseMove() {
    console.log('onMouseMove');
  }

  onMouseUp() {
    console.log('onMouseMove');
  }
}

export const createEvent = () => new MoveEvent();

export default new MoveEvent();
