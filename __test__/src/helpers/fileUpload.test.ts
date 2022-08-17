
import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../../src/helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dxqnlqxa1',
  api_key: '761577474779331',
  api_secret: 'aEahN3Iif7XNluShg6rUixvKlPw',
  secure: true
})

describe('first', () => {
  test('should upload a file succesfull', async() => { 
    const imageURL = "https://res.cloudinary.com/dxqnlqxa1/image/upload/v1629583063/zpa8fuxbdj5cgyj3gj0r.jpg";
    const blob = await (await fetch(imageURL)).blob()
    // console.log(blob);
    const file = new File([blob], "my-image2");
    
    const response = await fileUpload(file);
    expect(response).toHaveProperty('url')
    const id = response?.url.split('/').at(-1)?.split('.')[0];

    await cloudinary.api.delete_resources(['journal/'+id!],(err, result) => {
      expect(result).not.toBeUndefined();
      expect(err).toBeUndefined();
    })
    // console.log(id);

  });

  test('fileUpload must return when the file no exist', async() => {
    const errorMessage = {"error": {"message": "Empty file"}}
    const file = new File([], "my-image2");
    const url = await fileUpload(file);
    expect(url).toEqual(errorMessage);

   });
 });
