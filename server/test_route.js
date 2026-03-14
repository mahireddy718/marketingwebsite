import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

async function run() {
  try {
    const filename = "dummy_test.jpg";
    fs.writeFileSync(filename, "hello image bytes");
    
    const form = new FormData();
    form.append('image', fs.createReadStream(filename));
    
    // Check what happens if I ping it locally.
    // I need to START the server first in this script, or separately.
  } catch (err) {}
}
