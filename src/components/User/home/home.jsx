import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../home/home.css'
import axios from 'axios'
import { useSelector } from 'react-redux'


function Home() {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const APIURL = useSelector(state => state.APIURL.url)

  const Logout = (() => {
    localStorage.clear();
    navigate('/')
  })

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/');
  } else{
    axios.get(`${APIURL}/profile`, {
      params: { email: userEmail },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(response => {
      console.log(response);
      setData(response.data)
    }).catch((error) => {
      console.error(error.message);
    })
  }
  
  }, [APIURL])

  return (
    <div>
      
    <div className="wrapper">
      
            
      { data.email && <div className="profile-card js-profile-card">
        <div className="profile-card__img">
        <img src={`${APIURL}/public/images/${data.image}`} alt={data.image} />
        </div>

        <div className="profile-card__cnt js-profile-cnt">
          <div className="profile-card__name">{data.username}</div>
          <div className="profile-card__txt"> Email ID  :   <strong>{data.email}</strong></div>
          <div className="profile-card-loc">
            <span className="profile-card-loc__icon">
              <svg className="icon"><use xlinkHref="#icon-location"></use></svg>
            </span>

            <span className="profile-card-loc__txt"> PHONE  : {data.mobile}  </span>
          </div>

          <div className="profile-card-inf">
            <div className="profile-card-inf__item">
              <div className="profile-card-inf__title">Joining Date : {data.date}</div>
             
            </div>

           
          </div>

      

          <div className="profile-card-ctr">
            <button onClick={(() => { navigate('/profile-update') })} className="profile-card__button button--blue js-message-btn">EDIT</button>
            <button onClick={Logout} className="profile-card__button button--orange">LOGOUT</button>
          </div>
        </div>

        <div className="profile-card-message js-message">
          <form className="profile-card-form">
            <div className="profile-card-form__container">
              <textarea placeholder="Say something..."></textarea>
            </div>

            <div className="profile-card-form__bottom">
              <button className="profile-card__button button--blue js-message-close">
                Send
              </button>

              <button className="profile-card__button button--gray js-message-close">
                Cancel
              </button>
            </div>
          </form>

          <div className="profile-card__overlay js-message-close"></div>
        </div>
      </div>}
      
    </div>
    </div>
  )
}

export default Home