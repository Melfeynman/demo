import { useEffect } from "react"
import { Link } from "react-router";

export default function CreateMember() {
  useEffect(() => { document.title = 'Создать member' }, [])
  async function submitHandler(e) {
    e.preventDefault()
    const member = {
      ceo: e.target.ceo.value,
      age: e.target.age.value,
      post: e.target.post.value,
      organization: e.target.organization.value,
      salary: e.target.salary.value
    }
    await window.api.createMember(member);
    document.querySelector('form').reset()
  }

  return <div className="form">
    <Link to={'/'}><button>{"<-- Назад"}</button></Link>
    
    <h1>Создать member</h1>
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