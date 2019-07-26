import React from "react"
import { useAsync } from "react-async"
import ReactDOM from "react-dom"
import DevTools from "react-async-devtools"
import "./index.css"

const loadUser = ({ userId }) =>
  fetch(`https://reqres.in/api/users/${userId}`)
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())
    .then(({ data }) => data)

const UserPlaceholder = () => (
  <div className="user placeholder">
    <div className="avatar" />
    <div className="name">══════</div>
  </div>
)

const UserDetails = ({ data }) => (
  <div className="user">
    <img className="avatar" src={data.avatar} alt="" />
    <div className="name">
      {data.first_name} {data.last_name}
    </div>
  </div>
)

const User = ({ userId }) => {
  const { data, error, isPending } = useAsync({
    promiseFn: loadUser,
    debugLabel: `User ${userId}`,
    userId,
  })
  if (isPending) return <UserPlaceholder />
  if (error) return <p>{error.message}</p>
  if (data) return <UserDetails data={data} />
  return null
}

export const App = () => (
  <>
    <DevTools />
    <User userId={1} />
    <User userId={2} />
  </>
)

if (process.env.NODE_ENV !== "test") ReactDOM.render(<App />, document.getElementById("root"))
