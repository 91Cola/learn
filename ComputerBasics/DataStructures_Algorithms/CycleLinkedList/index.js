/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let pos = -1;
  let index = 0;
  let quick = head;
  let slow = head;

  // 判断是否环形链表
  while (quick && quick.next) {
    quick = quick.next.next;
    slow = slow.next;
    index++;

    if (!quick) {
      break;
    } else if (quick.next === slow.next) {
      pos = index;
      break;
    }
  }

  return pos > -1;
};
