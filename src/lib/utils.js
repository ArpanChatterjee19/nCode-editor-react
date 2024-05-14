// export function generateRandomColorNumber() {
//     let randomHue = Math.floor(Math.random() * 360);
//     return randomHue;
//   }

export function generatePlaceholderName(name) {
  //Split name by the space
  let splitUsername = name?.split(" "),
    /* we validate if the data comes correctly with optional chaining. In the worst case, we 
      return a empty string*/

    firstLetter = splitUsername[0]?.[0] ?? "",
    secondletter = splitUsername[1]?.[0] ?? "";
  return `${firstLetter.toUpperCase()}${secondletter.toUpperCase()}`;
}

export function generateRandomColorNumber(name) {
  const getHashOfString = (str) => {
    const string = String(str)
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
  };

  const normalizeHash = (hash, min, max) => {
    return Math.floor((hash % (max - min)) + min);
  };

  const hRange = [0, 360];
  const sRange = [50, 75];
  const lRange = [25, 60];

  const generateHSL = () => {
    const hash = getHashOfString(name);
    const h = normalizeHash(hash, hRange[0], hRange[1]);
    const s = normalizeHash(hash, sRange[0], sRange[1]);
    const l = normalizeHash(hash, lRange[0], lRange[1]);
    const hsl = [h, s, l];
    return hsl;
  };
  const hsl = generateHSL();
  return `hsl(${hsl[0]},${hsl[1]}%,${hsl[2]}%)`;
}
