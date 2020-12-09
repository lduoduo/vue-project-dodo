const reg = /[,\n\s:]\d{15,}[,\n\s:]/g;
const reg1 = /\d{15,}/g;

export default function(str: string) {
  const tmp = str.match(reg);
  if (!tmp) return str;

  // let tmpStr = str;
  // tmp.map(s => {
  //   const tmps = s.replace(reg1)
  //   tmpStr = tmpStr.replace(s, )
  // })
  return str;
}
