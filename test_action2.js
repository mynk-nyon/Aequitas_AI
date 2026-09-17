require('dotenv').config();
const { simplifyText } = require('./.next/server/app/page.js');
async function run() {
  try {
    console.log(await simplifyText("Hello world"));
  } catch(e) {
    console.error("Caught:", e);
  }
}
run();
