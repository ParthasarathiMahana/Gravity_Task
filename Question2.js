function DSAsolution(numsArr, target){
    let tempHashMap = new Map()

    for(let i=0; i<numsArr.length; i++){
        let requiredNum = target - numsArr[i]
        if(tempHashMap.has(requiredNum)){
            return [i, tempHashMap.get(requiredNum)]
        }else{
            tempHashMap.set(numsArr[i], i)
        }
    }

    return [-1, -1]
}

let resArray = DSAsolution([2, 7, 11, 15], 9)
console.log(resArray);

// Intution:

// I have used a hash map to store the element along with it's index. I am using that hasmap to store and check the availability of the required number
// for every element in the array. I am doing so to traverse through the array only once which has time complexity of O(n) which is better than O(n*2)
// and is asked in the question. if there is no match I am returning [-1, -1]