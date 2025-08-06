// import RouterManagement from '../modules/routing/RouterManagement';
import validate from './validate';

export default function shapedData(formQuery: string) {
  const formElement = document.querySelector(formQuery) as HTMLFormElement;
  const formData = new FormData(formElement);
  const data = {} as Record<string, FormDataEntryValue>;
  let failedValidation = false;
  formData.forEach((value, key) => {
    if (validate(key, value as string)) {
      data[key] = value;
    } else {
      failedValidation = true;
      console.log('failed validation: ', key, value);
    }
  });

  // console.log(data);

  if (!failedValidation) {
    // RouterManagement.go('/messenger');
    return data;
  }

  return;
}
