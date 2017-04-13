const BACKEND_URL = 'http://127.0.0.1:8080/UniWin'

const MOCK_BACKEND_URL = 'http://localhost:8081/mock'

const MOCK_POST = '/test/post'

module.exports = {
    backend_url: BACKEND_URL,

    addTechnique: BACKEND_URL + MOCK_POST,
    getAllTechnique: MOCK_BACKEND_URL + '/getAllTechnique.json',

}