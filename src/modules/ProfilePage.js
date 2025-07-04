import Button from "./Button";
import Profile from "./Profile";

const button = new Button({ text: 'Change name', settings: {withInternalId: true} });

const profile = new Profile({
    userName: 'John Doe',
    button
})

export default profile;