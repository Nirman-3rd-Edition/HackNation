import "./topBox.scss"
import {topDealUsers} from "../../data.ts"

const TopBox = () => {
  return (
    <div className="topBox">
      <h1>Top Players</h1>
      <div className="list">
        {topDealUsers.map(user=>(
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">⭐{user.grade}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBox