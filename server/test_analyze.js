import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

async function test() {
  try {
    const form = new FormData();
    form.append('image', fs.createReadStream('test.png')); // 1x1 png previously created

    const response = await axios.post('http://localhost:4003/api/ai/analyze-skin', form, {
      headers: {
        ...form.getHeaders()
      }
    });
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error from server:", error.response ? error.response.data : error.message);
  }
}

test();
