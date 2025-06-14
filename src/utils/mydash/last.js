function last(list) {
		if (!Array.isArray(list)) {
      return undefined;
    }

    let n = list.length;
    return n?list[n-1]:undefined;
}

export default last;
