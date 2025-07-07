import validate from './validate';

export default function submit(formQuery: string) {
  const formElement = document.querySelector(formQuery) as HTMLFormElement;
  const formData = new FormData(formElement);
  const data = {} as Record<string, FormDataEntryValue>;
  formData.forEach((value, key) => {
    if (validate(key, value as string)) {
      data[key] = value;
    } else {
      console.log('failed validation: ', key, value);
    }
  });
  console.log(data);
}
