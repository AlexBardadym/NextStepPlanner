localStorage.setItem('userIdCounter', '');

interface UserInterface {
    userName: string,
    userPassword: string,
    id: number
}

class User implements UserInterface {
    userName: string;
    userPassword: string;
    id: number;
    constructor(id: number, userName: string, userPassword: string) {
        this.id = id;
        this.userName = userName;
        this.userPassword = userPassword;
    }
}

export { User };