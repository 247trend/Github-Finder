import { useEffect, useContext } from "react"
import GithubContext from "../context/github/GithubContext"
import { useParams } from "react-router-dom"
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from "react-icons/fa"
import { Link } from "react-router-dom"
import Loader from "../components/layout/Loader"
import RepoList from "../components/repos/RepoList"

const User = () => {
  const { user, getUser, loading, repos, getUserRepos } = useContext(GithubContext)

  const params = useParams()

  useEffect(() => {
    getUser(params.login)
  }, [])

  const { login, name, type, avatar_url, location, bio, hireable, public_repos, public_gists, followers, html_url, following, blog, twitter_username, created_at } = user

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <div className="w-full mx-auto lg:w-10/12">
        <div className="mb-4">
          <Link to="/" className="btn btn-ghost">
            Back To Search
          </Link>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
          <div className="custom-card-image mb-6 md:mb-0">
            <div className="rounded-lg shadow-xl card image-full">
              <figure>
                <img className="p-3" src={avatar_url} alt="avatar" />
              </figure>
              <div className="card-body justify-end">
                <h2 className="card-title mb-10 absolute">{login}</h2>
                <h1 className="absolute">{name}</h1>
              </div>
            </div>
          </div>

          <div className="mockup-code w-fit">
            <pre data-prefix="$">
              <code>
                git init <span className="text-success">{login}</span>
              </code>
            </pre>
            <pre data-prefix=">">
              <code>
                <div className=" mr-1 mt-1 badge badge-success">{type}</div>
                {hireable && <div className="mx-1 mt-1 badge badge-info">Hireable</div>}
              </code>
            </pre>
            <pre data-prefix=">">
              <code>
                return getJoinDate() <span className="text-warning">{created_at}</span>
              </code>
            </pre>
            <pre data-prefix=">">
              <code>...</code>
            </pre>
            <pre data-prefix=">">
              <code>...</code>
            </pre>
            {location && (
              <pre data-prefix="~">
                <code>
                  cd location <span className="text-info">{location}</span>
                </code>
              </pre>
            )}

            {blog && (
              <pre data-prefix="~">
                <code>
                  cd web
                  <a className="text-info" href={`https://${blog}`} target="_blank" rel="noreferrer">
                    {" "}
                    {blog}
                  </a>
                </code>
              </pre>
            )}

            {twitter_username && (
              <pre data-prefix="~">
                <code>
                  cd twitter
                  <a className="text-info" href={`https://twitter.com/${twitter_username}`} target="_blank" rel="noreferrer">
                    {" "}
                    {twitter_username}
                  </a>
                </code>
              </pre>
            )}
          </div>
        </div>

        <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUsers className="text-3xl md:text-5xl" />
            </div>
            <div className="stat title pr-5">Followers</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">{followers}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUserFriends className="text-3xl md:text-5xl" />
            </div>
            <div className="stat title pr-5">Following</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">{following}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaCodepen className="text-3xl md:text-5xl" />
            </div>
            <div className="stat title pr-5">Public Repos</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">{public_repos}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaStore className="text-3xl md:text-5xl" />
            </div>
            <div className="stat title pr-5">Public Gists</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">{public_gists}</div>
          </div>
        </div>

        <RepoList />  
      </div>
    </>
  )
}

export default User
