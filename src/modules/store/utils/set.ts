interface State {
  [key: string]: unknown;
}

export default function set(state: State, property: string, value: unknown) {
  state[property] = value;
}
