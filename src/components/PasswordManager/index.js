import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import './index.css'
import PasswordItem from '../PasswordItem'

const initialLetterBgClasses = [
  'color-1',
  'color-2',
  'color-3',
  'color-4',
  'color-5',
  'color-6',
  'color-7',
]

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searchText: '',
    showPasswords: false,
    passwordList: [],
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const {website, username, password} = this.state
    const initialColor =
      initialLetterBgClasses[
        Math.floor(Math.random() * initialLetterBgClasses.length)
      ]
    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
      initialColor,
    }

    this.setState(prevState => ({
      website: '',
      username: '',
      password: '',
      passwordList: [...prevState.passwordList, newPassword],
    }))
  }

  handleFormInput = e => {
    const {name} = e.target
    const {value} = e.target
    if (name === 'website') {
      this.setState({
        website: value,
      })
    } else if (name === 'username') {
      this.setState({
        username: value,
      })
    } else {
      this.setState({
        password: value,
      })
    }
  }

  handlePasswordSearch = e => {
    this.setState({
      searchText: e.target.value,
    })
  }

  toggleShowPasswords = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  handleDeletePassword = id => {
    const {passwordList} = this.state
    const updatedList = passwordList.filter(object => object.id !== id)
    this.setState({
      passwordList: updatedList,
    })
  }

  render() {
    const {
      website,
      username,
      password,
      passwordList,
      showPasswords,
      searchText,
    } = this.state

    const filteredPasswordList = passwordList.filter(object =>
      object.website.toLowerCase().includes(searchText.toLowerCase()),
    )
    const totalPasswords = filteredPasswordList.length

    return (
      <div className="bg-container">
        <div className="content-container">
          <div className="logo-container">
            <img
              className="logo"
              alt="app logo"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            />
          </div>
          <div className="pwd-form-container">
            <div className="sm-pwd-container">
              <img
                className="pmgr-img"
                alt="password manager"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              />
            </div>
            <div className="lg-pwd-container">
              <img
                className="pmgr-img"
                alt="password manager"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              />
            </div>
            <form className="password-form" onSubmit={this.handleFormSubmit}>
              <h1 className="pf-head">Add New Password</h1>
              <div className="form-item">
                <img
                  className="input-image"
                  alt="website"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                />
                <input
                  className="input"
                  name="website"
                  onChange={this.handleFormInput}
                  value={website}
                  type="text"
                  placeholder="Enter Website"
                />
              </div>
              <div className="form-item">
                <img
                  className="input-image"
                  alt="username"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                />
                <input
                  className="input"
                  name="username"
                  onChange={this.handleFormInput}
                  value={username}
                  type="text"
                  placeholder="Enter Username"
                />
              </div>
              <div className="form-item">
                <img
                  className="input-image"
                  alt="password"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                />
                <input
                  className="input"
                  name="password"
                  onChange={this.handleFormInput}
                  value={password}
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <div className="form-btn-container">
                <button className="form-btn" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="pwd-list-container">
            <div className="pwd-search-container">
              <div className="your-pass-container">
                <h1 className="para-pass">Your Passwords </h1>
                <p className="para-span">{totalPasswords}</p>
              </div>
              <div className="search-box-container">
                <img
                  className="search-img"
                  alt="search"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                />
                <input
                  className="search-input"
                  value={searchText}
                  onChange={this.handlePasswordSearch}
                  type="search"
                  placeholder="Search"
                />
              </div>
            </div>
            <hr />
            <div className="sp-container">
              <input
                className="sp-input"
                id="showPassword"
                type="checkbox"
                onChange={this.toggleShowPasswords}
              />
              <label className="sp-label" htmlFor="showPassword">
                Show Passwords
              </label>
            </div>
            {totalPasswords === 0 ? (
              <div className="no-pass-container">
                <img
                  className="no-pass-img"
                  alt="no passwords"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                />
                <p>No Passwords</p>
              </div>
            ) : (
              <ul className="ul-pwd-list-container">
                {filteredPasswordList.map(object => (
                  <PasswordItem
                    key={object.id}
                    item={object}
                    showPasswords={showPasswords}
                    handleDeletePassword={this.handleDeletePassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
