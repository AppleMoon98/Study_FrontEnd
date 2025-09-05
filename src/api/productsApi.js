import { API_SERVER_HOST } from "./todoApi"
import jwtAxios from "../util/JWTUtil"

const host = `${API_SERVER_HOST}/api/products`

export const getOne = async (pno) => {
    const res = await jwtAxios.get(`${host}/${pno}`)
    return res.data
}

export const getList = async (pageParam) => {
    const { page, size } = pageParam
    const res = await jwtAxios.get(`${host}/list`, { params: { page: page, size: size } })
    return res.data
}

export const postAdd = async (products) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } }
    const res = await jwtAxios.post(`${host}/`, products, header)

    return res.data
}

export const putOne = async (formData, pno) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } }
    const res = await jwtAxios.put(`${host}/${pno}`, formData, header)
    return res.data
}


export const deleteOne = async (products) => {
    const res = await jwtAxios.delete(`${host}/${products.pno}`)
    return res.data
}

export const getOneImage = (fileName) => {
    return `${host}/view/${fileName}`
}