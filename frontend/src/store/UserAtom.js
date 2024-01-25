import { atom } from 'recoil'

const UserAtom = atom({
    key: 'UserAtom', // unique ID (with respect to other atoms/selectors)
    default: {
        firstName:"",
        lastName:"",
        userId:"",
        balance:undefined,
    }, // default value (aka initial value)
  });

export default UserAtom