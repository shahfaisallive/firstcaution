import axios from "../../axios"
import { IPFS_UPLOAD_FAIL, IPFS_UPLOAD_REQUEST, IPFS_UPLOAD_SUCCESS, MONSTER_MATCH_FAIL, MONSTER_MATCH_REQUEST, MONSTER_MATCH_SUCCESS, RANDOM_MONSTER_FAIL, RANDOM_MONSTER_REQUEST, RANDOM_MONSTER_SUCCESS } from "../constants/monsterConstants"

export const matchMonster = ({element, family, skin}) => async (dispatch) => {
    try {
        dispatch({ type: MONSTER_MATCH_REQUEST })

        const { data } = await axios.get(`/${element}/${family}/${skin}`)
        console.log(data)

        dispatch({
            type: MONSTER_MATCH_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MONSTER_MATCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const generateRandomMonster = () => async (dispatch) => {
    try {
        dispatch({ type: RANDOM_MONSTER_REQUEST })

        const { data } = await axios.get(`/randommonster`)
        console.log(data)

        dispatch({
            type: RANDOM_MONSTER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: RANDOM_MONSTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}


export const ipfsMediaUpload = (media) => async (dispatch) => {
    try {
        dispatch({ type: IPFS_UPLOAD_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true'
            }
        }

        console.log(media)

        const { data } = await axios.get(`/ipfs/${media}`, config)
        console.log(data)

        dispatch({
            type: IPFS_UPLOAD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: IPFS_UPLOAD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}