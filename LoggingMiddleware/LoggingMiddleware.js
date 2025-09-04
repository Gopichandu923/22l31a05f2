import axios from "axios";

async function Log(stack, level, package, message) {
  // url for api call to test server
  const url = "http://20.244.56.144/evaluation-service/logs";

  const res = await axios.post(url, {
    stack: stack.lower(),
    level: level,
    package: package,
    message: message,
  });
  return res.data;
}
