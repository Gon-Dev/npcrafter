import './User.css'

function User() {
  return (
    <section className='user-wrapper'>
      <p className='user-name'>username_random_123</p>
      <img className='user-image' src="https://picsum.photos/200" alt="User profile picture" />
    </section>
  )
}

export default User;