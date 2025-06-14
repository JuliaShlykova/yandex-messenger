function rangeRight(start, end, step) {
		return range(start, end, step, true);
}

function range(start, end, step, isRight=false) {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    if (step === undefined) {
        step = (start < end) ? 1 : -1;
    }

    let newArr = [];
    if (step===0) {
        newArr = new Array(end-1).fill(start);
    } else {
        if (isRight) {
            while (Math.abs(start)<Math.abs(end)) {
                end-=step
                newArr.push(end);
            }
        } else {
            while (Math.abs(start)<Math.abs(end)) {
                newArr.push(start);
                start+=step;
            }
        }
    }

    return newArr;
}

export default rangeRight;
