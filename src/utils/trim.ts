function trim(str: string, symbols?:string) {
  let trimmedStr = str;
  if (symbols) {
    const re = new RegExp('[' + symbols + ']', 'gi');
    trimmedStr = trimmedStr.replace(re, '');
  }

  return trimmedStr.trim();
}

export default trim;
