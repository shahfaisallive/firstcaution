import { IPFS_UPLOAD_FAIL, IPFS_UPLOAD_REQUEST, IPFS_UPLOAD_SUCCESS, MONSTER_MATCH_FAIL, MONSTER_MATCH_REQUEST, MONSTER_MATCH_SUCCESS, RANDOM_MONSTER_FAIL, RANDOM_MONSTER_REQUEST, RANDOM_MONSTER_SUCCESS } from "../constants/signupConstants"


export const monsterMatchReducer = (state = {loading: true, monster: {}}, action) => {
    switch (action.type) {
        case MONSTER_MATCH_REQUEST:
            return { loading: true }

        case MONSTER_MATCH_SUCCESS:
            return { loading: false, monster: action.payload }

        case MONSTER_MATCH_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const randomMonsterReducer = (state = {loading: true, monster: null}, action) => {
    switch (action.type) {
        case RANDOM_MONSTER_REQUEST:
            return { loading: true }

        case RANDOM_MONSTER_SUCCESS:
            return { loading: false, monster: action.payload }

        case RANDOM_MONSTER_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const ipfsUploadReducer = (state = {loading: true, ipfsURL: null }, action) => {
    switch (action.type) {
        case IPFS_UPLOAD_REQUEST:
            return { loading: true }

        case IPFS_UPLOAD_SUCCESS:
            return { loading: false, ipfsURL: action.payload }

        case IPFS_UPLOAD_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

