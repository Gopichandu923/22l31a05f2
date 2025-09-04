function ShortCodeGenerator() {
  const elements = "abcdefghijklmnopqrstuvwxyx";
  const nums = "1234567890";
  var shortCode = "";
  for (let i = 0; i < 4; i++) {
    shortCode += elements[Math.floor(Math.random() * 25)];
  }
  shortCode += nums[Math.floor(Math.random() * 10)];
  return shortCode;
}

export { ShortCodeGenerator, CalculateExpiry };
