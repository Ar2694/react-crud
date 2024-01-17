import React, { useContext, useEffect, useState } from "react";
import UserService from "../api/services/UserService";
import { User } from "../interfaces/UserInterface";

// Props typefor UsersProviderProps
interface UsersProviderProps {
    children: React.ReactNode;
}

export interface UsersContextType {
    users: User[],
    findUser: (id: string) => void,
    deteteUser: (id: string) => void,
    createUser: (user: User) => void,
    updateUser: (user: User) => void
}

const UsersContext = React.createContext<UsersContextType>({
    users: [],
    findUser: () => { },
    deteteUser: () => { },
    createUser: () => { },
    updateUser: () => { }
});

// create user provider
export default function UsersProvider({ children }: UsersProviderProps) {
    const [users, setUsers] = useState<User[]>([]);

    const findAllUsers = async () => {
        const findUsers = await UserService.findAllUsers();
        setUsers(findUsers);
    }

    const findUser = async (id: string) => {
        return await UserService.findUser(id);
    }

    const deteteUser = async (id: string) => {
        await UserService.deleteUser(id);
        findAllUsers();
    }

    const createUser = async (user: User) => {
        await UserService.createUser(user);
        const newUsers = await UserService.findAllUsers();
        setUsers(newUsers);
    }

    const updateUser = async (user: User) => {
        await UserService.updateUser(user);
        const newUsers = await UserService.findAllUsers();
        setUsers(newUsers);
    }

    const context = {
        users: users,
        findUser: findUser,
        deteteUser: deteteUser,
        createUser: createUser,
        updateUser: updateUser
    }

    useEffect(() => {
        findAllUsers();
    }, []);

    return (
        <UsersContext.Provider value={context}>
            {children}
        </UsersContext.Provider>
    );
}

export const useUsersContext = () => useContext(UsersContext);