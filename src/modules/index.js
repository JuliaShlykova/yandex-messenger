// У кнопки есть index.js, который экспортирует только нужное
import Button from "./Button";
import Profile from "./Profile";
import { render } from "./renderDOM";

// const button = new Button({
//         className: 'my-class',
//         child: 'Click me',
//         events: {
//           click: event => {
//             console.log('click');
//             button.setProps({child: 'new click'})
//           }
//         },
//         settings: {
//           withInternalId: true
//         }
// });

const button = new Button({ text: 'Change name', settings: {withInternalId: true} });

const profile = new Profile({
    userName: 'John Doe',
    button
})

// app — это class div в корне DOM
render("#app", profile);

setTimeout(() => {
    // Обновляем кнопку
    button.setProps({ text: 'Updated text on button' });
}, 3000); 

// Через секунду контент изменится сам, достаточно обновить пропсы
