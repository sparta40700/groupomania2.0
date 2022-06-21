import {createContext, useState} from "react";

export const UserContext = createContext({})

export const DataProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(undefined)

    return (
        <UserContext.Provider value={{
            currentUser, setCurrentUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext