type User = {
    id: number,
    email: string,
    username: string, 
    password: string
};

type UserInstance = Partial<User>;

export {
    User,
    UserInstance
};