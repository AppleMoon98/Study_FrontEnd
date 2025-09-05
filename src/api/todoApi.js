import jwtAxios from "../util/JWTUtil"

export const API_SERVER_HOST = 'http://127.0.0.1:8080'

const prefix = `${API_SERVER_HOST}/api/todo`

export const getOne = async (tno) => {
    const res = await jwtAxios.get(`${prefix}/${tno}`)
    return res.data
}

export const getList = async (pageParam) => {
    const { page, size } = pageParam
    const res = await jwtAxios.get(`${prefix}/list`, { params: { page: page, size: size } })
    return res.data
}

export const postAdd = async (todoObj) => {
    const res = await jwtAxios.post(`${prefix}/`, todoObj)
    return res.data
}

export const putOne = async (todo) => {
    const res = await jwtAxios.put(`${prefix}/${todo.tno}`, todo)
    return res.data
}

export const deleteOne = async (todo) => {
    const res = await jwtAxios.delete(`${prefix}/${todo.tno}`)
    return res.data
}