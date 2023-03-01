/** *
 *  将列表型的数据转化成树形数据 => 递归算法 => 自身调用自身 => 一定条件不能一样， 否则就会死循环
 *  遍历树形 有一个重点 要先找一个头儿
 * ***/
export function tranListToTreeData(list, rootValue) {
  let arr = []
  list.forEach(item => {
    if (item.pid === rootValue) {
      // 找到之后 就要去找 item 下面有没有子节点
      const children = tranListToTreeData(list, item.id)
      if (children.length) {
        // 如果children的长度大于0 说明找到了子节点
        item.children = children
      }
      arr.push(item) // 将内容加入到数组中
    }
  })
  return arr
}
