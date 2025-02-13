import { useEffect, useState } from "react"
import { Link } from "react-router";
import { useNavigate } from "react-router";
import logo from './assets/Лого.png'

function App() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await window.api.getMembers()
      setMembers(res)
    })()
  }, [])

  return (
    <>
      <div className="page-heading">
        <img className="page-logo" src={logo} alt="" />
        <h1>Members</h1>
      </div>
      <ul className="members-list">
        {members.map((member) => {
          return <li className="member-card" key={member.id} onClick={() => { navigate('/update', { state: { member } }) }}>
            <div className="member-data">
              <p className="card_heading">{member.ceo} </p>
              <div className="member-data-info">
                <p>{member.age}</p>
                <p>{member.post}</p>
                <p>{member.organization}</p>
                <p>{member.salary}</p>
              </div>
            </div>
            <div className="member-sale member-data card_heading">
              {member.cir}
            </div>
          </li>
        })}
      </ul>

      <Link to={'/create'}>
        <button>
          Создать member
        </button>
      </Link>
    </>
  )
}

export default App;
