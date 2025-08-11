export default function showValidationError(name: string) {
  switch (name) {
    case 'first_name':
    case 'second_name':
      return 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов';
    case 'login':
      return 'от 3 до 20 символов, латиница, может содержать цифры, без пробелов, без спецсимволов';
    case 'email':
      return 'латиница, может включать цифры и спецсимволы, обязательно должна быть «собака» (@)';
    case 'password':
    case 'confirm-password':
    case 'newPassword':
    case 'oldPassword':
      return 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
    case 'phone':
      return 'от 10 до 15 символов, состоит из цифр, может начинается с плюса';
    case 'message':
    case 'title':
      return 'не должно быть пустым';
    default:
      return 'no such name';
  }
}
