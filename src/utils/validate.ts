export default function validate(name: string, value: string) {
  switch (name) {
    case 'first_name':
    case 'second_name':
      return /^[A-ZА-ЯЁ][a-zа-яё-]*/.test(value);
    case 'login':
      return /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}/.test(value);
    case 'email':
      return /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+/.test(value);
    case 'password':
    case 'confirm-password':
    case 'newPassword':
    case 'oldPassword':
      return /^(?=.*[A-Z])(?=.*\d).{8,40}/.test(value);
    case 'phone':
      return /^\+?\d{10,15}/.test(value);
    case 'message':
    case 'title':
      return value.trim().length > 0;
    case 'avatar':
      return true;
    default:
      return false;
  }
}
