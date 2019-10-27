const { time, timeEnd, logAll } = require("./timer");

const myMethods = {
  myForEach: function(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  },
  myMap: function(callback) {
    let arr = [...this];
    for (let i = 0; i < this.length; i++) {
      arr[i] = callback(this[i], i, this);
    }
    return arr;
  },
  mySort: function(callback) {
    function mergeSort(unsortedArray) {
      if (unsortedArray.length <= 1) return unsortedArray;

      const middle = Math.floor(unsortedArray.length / 2);
      const left = unsortedArray.slice(0, middle);
      const right = unsortedArray.slice(middle);

      return merge(mergeSort(left), mergeSort(right));
    }

    function merge(left, right) {
      let resultArray = [],
        leftIndex = 0,
        rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        if (
          !!callback
            ? callback(left[leftIndex], right[rightIndex])
            : left[leftIndex] < right[rightIndex]
        ) {
          resultArray.push(left[leftIndex]);
          Object.defineProperty(Array.prototype, "myFilter", {
            value: function(callback) {
              let arr = [];
              for (let i = 0; i < this.length; i++) {
                if (!!callback(this[i], i, this)) arr = [...arr, this[i]];
              }
              return arr;
            }
          });
          leftIndex++;
        } else {
          resultArray.push(right[rightIndex]);
          rightIndex++;
        }
      }

      return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
    }
    return mergeSort(this);
  },
  myFilter: function(callback) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      if (!!callback(this[i], i, this)) arr = [...arr, this[i]];
    }
    return arr;
  },
  myPush: function(...elements) {
    this.splice(this.length, 0, ...elements);
  }
};

Array.prototype = Object.assign(Array.prototype, myMethods);

const array = [];

time("myMethods", "myForEach && myPush");
Array.from(Array(1000).keys()).myForEach(item => array.myPush(item));
timeEnd("myMethods", "myForEach && myPush");

time("myMethods", "myMap");
array.myMap(item => item * 2);
timeEnd("myMethods", "myMap");

time("myMethods", "mySort");
array.mySort();
timeEnd("myMethods", "mySort");

time("myMethods", "myFilter");
array.myFilter(item => item > 990);
timeEnd("myMethods", "myFilter");

const result = array
  .myFilter(item => item > 990)
  .myMap(item => item * 2)
  .reverse()
  .mySort();

console.log("result", result);

logAll();
