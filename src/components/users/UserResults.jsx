import { useEffect, useState } from "react"
import "../styles/loader.css"

const UserResults = () => {
  const [users, setUsers] = useState([])
  const [loading, isLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_API}`,
      },
    })

    const data = await res.json()
    setUsers(data)
    isLoading(false)
  }

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <h3>{user.login}</h3>
        ))}
      </div>
    )
  } else {
    return (
      <div className="text-center mx-auto">
        <span class="loader text-center mx-auto"></span>
        <h3>Loading ...</h3>
      </div>
    )
  }
}

export default UserResults
