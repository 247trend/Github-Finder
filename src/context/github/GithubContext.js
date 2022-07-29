import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_API

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    const { items } = await res.json()

    dispatch({
      type: "GET_USERS",
      payload: items,
    })
  }

  const getUser = async (login) => {
    setLoading()

    const res = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if (res.status === 404) {
      window.location = "/notfound"
    } else {
      const data = await res.json()

      dispatch({
        type: "GET_USER",
        payload: data,
      })
    }
  }

  const getUserRepos = async (login) => {
    setLoading()

    const res = await fetch(`${GITHUB_URL}/search/users/${login}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    const data = await res.json()

    dispatch({
      type: "GET_REPOS",
      payload: data,
    })
  }

  const setLoading = () => dispatch({ type: "SET_LOADING" })

  const clearUsers = () => dispatch({ type: "CLEAR_USERS" })

  return <GithubContext.Provider value={{ repos: state.repos, user: state.user, users: state.users, loading: state.loading, searchUsers, clearUsers, getUser, getUserRepos }}>{children}</GithubContext.Provider>
}

export default GithubContext
