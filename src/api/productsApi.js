import axios from "axios"
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/products`

export const getOne = async (pno) => {
    const res = await axios.get(`${host}/${pno}`)
    return res.data
}

export const getList = async (pageParam) => {
    const { page, size } = pageParam
    const res = await axios.get(`${host}/list`, { params: { page: page, size: size } })
    return res.data
}

export const postAdd = async (products) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } }
    const res = await axios.post(`${host}/`, products, header)

    return res.data
}

export const putOne = async (products) => {
    const res = await axios.put(`${host}/${products.pno}`, products)
    return res.data
}

export const deleteOne = async (products) => {
    const res = await axios.delete(`${host}/${products.pno}`)
    return res.data
}

export const getOneImage = (fileName) => {
    return `${host}/view/${fileName}`
}