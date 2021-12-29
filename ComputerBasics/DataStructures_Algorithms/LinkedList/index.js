function genNode(value) {
  return {
    value,
    next: null,
  };
}

var MyLinkedList = function () {
  this.head = genNode(null);
  this.length = 0;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index > this.length - 1) return -1;

  let node = this.head;

  while (index-- >= 0) {
    node = node.next;
  }

  return node.value;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  const node = genNode(val);

  node.next = this.head.next;
  this.head.next = node;
  this.length++;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  const newNode = genNode(val);
  let node = this.head;

  while (node.next) {
    node = node.next;
  }

  node.next = newNode;
  this.length++;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index > this.length) return -1;

  if (index <= 0) {
    this.addAtHead(val);
  } else if (index === this.length) {
    this.addAtTail(val);
  } else {
    const node = genNode(val);
    let curNode = this.head;

    index--;

    while (index-- >= 0) {
      curNode = curNode.next;
    }

    node.next = curNode.next;
    curNode.next = node;
    this.length++;
  }
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index > this.length - 1) return -1;

  let curNode = this.head;

  index--;

  while (index-- >= 0) {
    curNode = curNode.next;
  }

  curNode.next = curNode.next ? curNode.next.next : null;
  this.length--;
};

// 执行和输出方法
function print_get({ method, arg }) {
  const res = this[method].apply(this, arg);

  console.log(`obj.${method}(${arg.join(", ")}): ${res}`);

  return res;
}

function print_other({ method, arg }) {
  console.log(`obj.${method}(${arg.join(", ")}): ${JSON.stringify(this.head)}`);
  return null;
}

const methods = {
  GET: "get",
  ADD_AT_HEAD: "addAtHead",
  ADD_AT_TAIL: "addAtTail",
  ADD_AT_INDEX: "addAtIndex",
  DEL_AT_INDEX: "deleteAtIndex",
};

const METHOD_MAPS = {
  [methods.GET]: print_get,
  [methods.ADD_AT_HEAD]: print_other,
  [methods.ADD_AT_TAIL]: print_other,
  [methods.ADD_AT_INDEX]: print_other,
  [methods.DEL_AT_INDEX]: print_other,
};

function autoExec(methods, args) {
  const obj = new MyLinkedList();
  const _methods = methods.slice(1);
  const _args = args.slice(1);
  const printArr = [];

  _methods.forEach((method, index) => {
    try {
      obj[method].apply(obj, _args[index]);

      // console.log
      printArr.push(
        METHOD_MAPS[method].call(obj, {
          method,
          arg: _args[index],
        })
      );
    } catch (err) {
      console.log(err);
    }
  });

  console.log(JSON.stringify(printArr));
}
// autoExec(
//   [
//     "addAtHead",
//     "addAtHead",
//     "addAtHead",
//     "addAtIndex",
//     "deleteAtIndex",
//     "addAtHead",
//     "addAtTail",
//     "get",
//     "addAtHead",
//     "addAtIndex",
//     "addAtHead",
//   ],
//   [[7], [2], [1], [3, 0], [2], [6], [4], [4], [4], [5, 0], [6]]
// );

// autoExec(
//   ["addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"],
//   [[1], [3], [1, 2], [1], [1], [1]]
// );

autoExec(
  [
    "MyLinkedList",
    "addAtHead",
    "addAtHead",
    "addAtHead",
    "addAtIndex",
    "deleteAtIndex",
    "addAtHead",
    "addAtTail",
    "get",
    "addAtHead",
    "addAtIndex",
    "addAtHead",
  ],
  [[], [7], [2], [1], [3, 0], [2], [6], [4], [4], [4], [5, 0], [6]]
);
