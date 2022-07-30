import { useState, useContext } from "react"
import GithubContext from "../../context/github/GithubContext"
import AlertContext from "../../context/alert/AlertContext"

const UserSearch = () => {
  const [text, setText] = useState("")

  const { users, searchUsers, clearUsers } = useContext(GithubContext)

  const { setAlert } = useContext(AlertContext)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text === "") {
      setAlert("Search input cannot be empty.", "error")
    } else {
      searchUsers(text)
      setText("")
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input onChange={handleChange} type="text" className="w-full pr-40 bg-gray-200 input input-lg text-black mt-2" placeholder="Search" value={text} />
              <p className="text-xs ml-1 mt-1">Please search via username or part of it</p>
              <button className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg mt-2">GO</button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button onClick={clearUsers} className="btn btn-ghost btn-lg">
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
