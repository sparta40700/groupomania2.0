import axios from "axios"
const API_URL_AUTH = "http://localhost:8000/api/user/"
const API_URL_PROFILE = "http://localhost:8000/api/profile/"

const registration = (pseudo, email, password, avatar, isAdmin) => {
  return axios.post(
      API_URL_AUTH + "register",
      {pseudo, email, password, avatar, isAdmin}
  )
}

const login = (email, password) => {
    return axios
        .post(API_URL_AUTH + "login", {email, password})
        .then((response) => {
            if(response.data.token){
                //localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.token ))
                return response.data
            }
            return undefined
        })
}

const getCurrentUser = (userId, token) => {
    console.log('get current user')
    return axios
        .get(API_URL_PROFILE + `${userId}` , {
            headers:{
                Authorization: token
            }
        })
        .then((response) => {
            if(response.data){
                return response.data
            }
            return undefined
        })
}

const updateUserInfos = (id, token, username, email) => {
    const data = {
        username: username,
        email: email
    }
    return axios
        .put(API_URL_PROFILE + "infos/" + `${id}`, data, {
            headers:{
                Authorization: token,
            }
        })
        .then((response) => {
            if(response.data){
                return response.data
            }
            return undefined
        }).catch((error) => console.log(error))
}

const updateAvatar = (id, token, avatarFile) => {
    console.log(avatarFile)
    const data = new FormData()
    data.append('avatar',avatarFile)
    return axios.post(API_URL_PROFILE + "avatar/" + `${id}`, data,{
        headers:{
            Authorization: token
        }
    }).then((response) => {
        if(response.data){
            return response.data
        }
        return undefined
    }).catch((error) => console.log(error))
}

const updateUserPassword = (id, token, password) => {
    const data = { password: password }
    return axios
        .put(API_URL_PROFILE + "password/" + `${id}`, data, {
            headers:{
                Authorization: token
            }
        })
        .then((response) => {
            if(response.data){
                return response.data
            }
            return undefined
        })
}

const deleteUser = (id, token) => {
    axios.delete(API_URL_PROFILE + "delete/" + id, {
        headers:{
            Authorization: token
        }
    }).then((response) => {
        console.log(response + " utilisateur supprimé !")
        //localStorage.setItem("user", null) //put after delete
    })
}

const AuthService = {
    registration,
    login,
    getCurrentUser,
    updateAvatar,
    updateUserInfos,
    updateUserPassword,
    deleteUser,
}

export default AuthService