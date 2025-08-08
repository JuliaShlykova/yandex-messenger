// Higher-order component for subscription

import isObjectEqual from '../../utils/isObjectEqual';
import Block, { BlockProps } from '../Block';
import store, { Indexed, StoreEvents } from './store';

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function(Component: typeof Block) {
    return class extends Component {
      constructor(props: BlockProps) {
        // save initial state
        let state = mapStateToProps(store.getState());
        super({ ...props, ...mapStateToProps(store.getState()) });
        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          if (!isObjectEqual(state, newState)) {
            this.setProps({ ...newState });
          }
          state = newState;
        });
      }
    };
  };
}

export const withUser = connect(state => ({ user: state.user }));

export default connect;
