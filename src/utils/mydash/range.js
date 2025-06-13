function range(start, end, step) {
	let s, e, i;
    if (arguments.length === 1) {
        [e] = arguments;
        s = 0;
        i = (s < e) ? 1 : -1;
    } else if (arguments.length === 2) {
        [s, e] = arguments;
        i = (s < e) ? 1 : -1;
    } else {
        s = start;
        e = end;
        i = step;
    }
    let newArr = [];
    if (i===0) {
        newArr = new Array(end-1).fill(s);
    } else {
        while (Math.abs(s)<Math.abs(e)) {
            newArr.push(s);
            s+=i;
        }
    }

    return newArr;
}

export default range;