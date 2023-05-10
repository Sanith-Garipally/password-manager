import './index.css'

const PasswordItem = props => {
  const {item, showPasswords, handleDeletePassword} = props
  const {id, website, username, password, initialColor} = item
  const initialLetter = username.slice(0, 1)

  const deletePassword = () => {
    handleDeletePassword(id)
  }
  return (
    <li className="list-item">
      <div className="details-container">
        <h1 className={`initialLetter ${initialColor}`}>{initialLetter}</h1>
        <div>
          <p className="li-website">{website}</p>
          <p className="li-username">{username}</p>
          {showPasswords ? (
            <p className="li-password">{password}</p>
          ) : (
            <img
              className="stars-img"
              alt="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            />
          )}
        </div>
      </div>
      <button
        data-testid="delete"
        className="delete-btn"
        type="button"
        onClick={deletePassword}
      >
        <img
          className="delete-img"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}

export default PasswordItem
