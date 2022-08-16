
import { fileUpload } from '../src/helpers/fileUpload';

describe('first', () => {
  test('should upload a file succesfull', async() => { 
    const imageURL = "https://res.cloudinary.com/dxqnlqxa1/image/upload/v1629583063/zpa8fuxbdj5cgyj3gj0r.jpg";
    const blob = await (await fetch(imageURL)).blob()
    console.log(blob);
    const file = new File([blob], "my-image2");
    
    const url = await fileUpload(file);
    console.log(url);
    expect(url).toBe(true);

});
 })
