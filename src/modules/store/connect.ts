// Higher-order component for subscription

import isEqual from '../../utils/isEqual';
import Block, { BlockProps } from '../Block';
import store, { StoreEvents } from './store';

function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
  // используем class expression
  return class extends Component {
    constructor(props: BlockProps) {
      // save initial state
      let state = mapStateToProps(store.getState());
      super({ ...props, ...mapStateToProps(store.getState()) });

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());
        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }
        state = newState;
      });
    }
  };
}

// function mapUserToProps(state) {
//   return {
//     name: state.user.name,
//     avatar: state.user.avatar,
//   };
// }

// const UserProfile = connect(UserProfileComponent, mapUserToProps);
// const userProfile = new UserProfile();

// function connect(mapStateToProps: (state: Indexed) => Indexed) {
//   return function(Component: typeof Block) {
//     return class extends Component {
//       constructor(props) {
//         // сохраняем начальное состояние
//         let state = mapStateToProps(store.getState());

//         super({ ...props, ...state });

//         // подписываемся на событие
//         store.on(StoreEvents.Updated, () => {
//           // при обновлении получаем новое состояние
//           const newState = mapStateToProps(store.getState());

//           // если что-то из используемых данных поменялось, обновляем компонент
//           if (!isEqual(state, newState)) {
//             this.setProps({ ...newState });
//           }

//           // не забываем сохранить новое состояние
//           state = newState;
//         });
//       }
//     };
//   };
// }

// const withUser = connect(state => ({ user: state.user }));

// withUser(UserProfile);
// withUser(SettingsPage);

export default connect;
