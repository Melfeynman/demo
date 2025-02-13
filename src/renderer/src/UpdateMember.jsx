import { useEffect, useState } from "react"
import { useLocation } from 'react-router';
import { Link } from "react-router";

export default function UpdateMember() {
  useEffect(() => { document.title = 'Обновить member' }, [])
  const location = useLocation();
  const [member, setMember] = useState(location.state.member);

  async function submitHandler(e) {
    e.preventDefault()
    const updMember = {
      id: member.id,
      type: e.target.type.value,
      name: e.target.name.value,
      ceo: e.target.ceo.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      rating: e.target.rating.value
    }
    await window.api.updateMember(updMember);
    setMember(updMember)
    document.querySelector('form').reset()
  }

  return <div className="form">
    <Link to={'/'}><button>{"<-- Назад"}</button></Link>
    <h1>Обновить member</h1>
    <form onSubmit={(e) => submitHandler(e)}>
      <label htmlFor="ceo">CEO:</label>
      <input id="ceo" type="text" required />
      <label htmlFor="age">Age:</label>
      <input id="age" type="text" required />
      <label htmlFor="post">Post:</label>
      <input id="post" type="text" required />
      <label htmlFor="organization">Organization:</label>
      <input id="organization" type="text" required />
      <label htmlFor="salary">Salary:</label>
      <input id="salary" type="text" required />
      <button type="submit">Создать member</button>
    </form>
  </div>
}