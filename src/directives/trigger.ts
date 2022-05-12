const trigger = {
// 指令的定义
  inserted(el, binging) {
    console.log(el.id);
    // eslint-disable-next-line no-unused-expressions
    el.id === 'displayN0' ? el.click() : null; // 只点击第一个，id是在循环中手动添加的
  // $(el).trigger('click')  // 所有都触发一次,然后就是最后一个
  }
};

export { trigger };
