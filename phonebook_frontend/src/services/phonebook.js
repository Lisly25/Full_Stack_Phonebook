import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
	return axios.get(baseUrl)
}

const create = newContact => {
	return axios.post(baseUrl, newContact)
}

const update = (id, newContact) => {
	return axios.put(`${baseUrl}/${id}`, newContact)
}

const remove = (id) => {
	return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }