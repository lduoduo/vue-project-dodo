
// 订阅器
class Dep {
  constructor() {
    this.subs = [];
  }
  // 收集观察者
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 通知观察者去更新视图
  notify() {
    this.subs.forEach(watcher => {
      watcher.upDate();
    });
  }
}

// 观察者
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 存储旧值
    this.oldValue = this.getOldValue();
  }
  // 获取旧值
  getOldValue() {
    // 在获取旧值的时候将观察者挂在到Dep订阅器上
    Dep.target = this;
    const oldValue = compileUtils.getValue(this.expr, this.vm);
    // 销毁Dep上的观察者
    Dep.target = null;
  }

  // 更新视图
  upDate() {
    // 获取新值
    const newValue = compileUtils.getValue(this.expr, this.vm);
    if (newValue !== this.oldValue) {
      this.cb(newValue);
    }
  }
}
