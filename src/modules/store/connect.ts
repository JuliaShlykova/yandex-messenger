// Higher-order component for subscription

import isObjectEqual from '../../utils/isObjectEqual';
import Block, { BlockProps } from '../Block';
import store, { Indexed, StoreEvents } from './store';

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function(Component: new (props: BlockProps) => Block) {
    return class extends Component {
      constructor(props: BlockProps) {
        let state = mapStateToProps(store.getState());
        super({ ...props, ...state });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища
          const newState = mapStateToProps(store.getState());
          if (!isObjectEqual(state, newState)) {
            this.setProps({ ...mapStateToProps(store.getState()) });
            state = newState;
          }
        });
      }
    };
  };
};

export const withCurrentChat = connect(state => ({
  currentChat: state.currentChat
}));

export const withMessages = connect(state => ({
  messages: state.messages
}));
