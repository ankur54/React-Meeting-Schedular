import { Fragment, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import openSocket from 'socket.io-client'


import './App.css'
import Header from './components/Header/Header';
import Meetings from './components/Meetings/Meetings';
import Teams from './components/Teams/Teams';

import Modal from './UI/Modal Container/Modal';
import Search from './UI/Search/Search';
import AuthFormConfig from './utils/Auth Form/AuthForm';
import SearchResults from './utils/Search Results/SearchResults';
import { authActions } from './store/AuthStore'
import { meetingActions } from './store/MeetingStore'


function App() {
  const [addMeetingClicked, setAddMeetingClicked] = useState(false)
  const [addTeamClicked, setAddTeamClicked] = useState(false)
  const [searchClicked, setSearchClicked] = useState(false)
  const [tab, setTab] = useState('meeting')
  const [meetingsList, setMeetingsList] = useState([])

  const token = useSelector(state => state.authentication.token)
  const logoutTime = useSelector(state => state.authentication.expiresIn)
  const dispatch = useDispatch()
  const isAuthenticated = !!token

  console.log(meetingsList)
  
  // configuring socket io client
  useEffect(() => {
    const socket = openSocket('http://localhost:8000')
    
    socket.on('meetings', data => {
        switch ( data.action ) {
            case 'CREATE':
              console.log('Meeting created SUCCESSFULLY')
              const newMeeting = data.meeting
              dispatch(meetingActions.addMeeting([ newMeeting ]))
              break;
        }
    })
  }, [])

  // logout timer
  useEffect(() => {
    const date = new Date()
    const currTime = date.getHours() * 60 * 60 * 1000 + 
                    date.getMinutes() * 60 * 1000 + 
                    date.getSeconds() * 1000 + 
                    date.getMilliseconds()
    console.log(currTime, logoutTime)

    if (!logoutTime) return;

    const remainingTime = logoutTime - currTime
    console.log(remainingTime)

    setTimeout(() => {
      dispatch(authActions.logout())
    }, remainingTime)
  }, [dispatch])

  const onAddMeetingClick = () => {
    setAddMeetingClicked(prev => !prev);
  }
  const onAddTeamClick = () => {
    setAddTeamClicked(prev => !prev);
  }
  const onSearchClicked = () => {
    setSearchClicked(prev => !prev);
  }
  const onChangeTab = tab => {
    setTab(tab)
  }
  const getSearchResults = async input => {
    try {
      console.log(input)
      const response = await fetch(`http://localhost:8000/meeting/filter?phrase=${input}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.status !== 200) {
        throw new Error (response.error)
      }
      
      const meetings = await response.json()
      setMeetingsList(meetings)
    }
    catch (err) {
      console.log(err)
    }
  }


  const onClickHandler = (
    tab === 'meeting' ? 
    onAddMeetingClick :
    onAddTeamClick
  )

  const clickState = (
    tab === 'meeting' ?
    addMeetingClicked :
    addTeamClicked
  )

  const mainPage = (
    <Fragment>
      <Modal
        showModal={searchClicked}
        onToggleModal={onSearchClicked}
      >
        <Search onClickHandler={getSearchResults}/>
        <SearchResults searchResults={meetingsList}/>
      </Modal>
      <Header 
        addClicked={clickState}
        searchClickedHandler={onSearchClicked}
        onClickHandler={onClickHandler}
        onChangeTab={onChangeTab}
        currTab={tab}
      />
      {
        tab === 'meeting' ? 
        <Meetings displayForm={addMeetingClicked}/> :
        <Teams 
          showModal={addTeamClicked}
          onToggleModal={onAddTeamClick}
        />
      }
    </Fragment>
  )

  return (
    <Fragment>
      <Switch>
        <Route path='/auth'>
          <AuthFormConfig/>
        </Route>
        {
          isAuthenticated &&
          <Route path='/'>
            { mainPage }
          </Route>
        }
        {
          !isAuthenticated &&
          <Route path='*'>
            <AuthFormConfig/>
          </Route>
        }
        {
          isAuthenticated &&
          <Route path='*'>
            { mainPage }
          </Route>
        }
      </Switch>
    </Fragment>
  );
}

export default App;