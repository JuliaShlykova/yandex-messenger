// import RouterManagement from '../modules/routing/RouterManagement';
import validate from './validate';

export default function shapedData(formQuery: string, clearForm = false) {
  const formElement = document.querySelector(formQuery) as HTMLFormElement;
  const formData = new FormData(formElement);
  const data = {} as Record<string, FormDataEntryValue | FormDataEntryValue[]>;
  let failedValidation = false;
  formData.forEach((value, key) => {
    if (validate(key, value as string)) {
      if (!Reflect.has(data, key)) {
        data[key] = value;
        return;
      }
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }
      data[key].push(value);
    } else {
      failedValidation = true;
      console.log('failed validation: ', key, value);
    }
  });

  // console.log(data);

  if (!failedValidation) {
    if (clearForm) {
      formElement.reset();
    }
    return data;
  }

  return;
}
