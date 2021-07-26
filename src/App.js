import { Fragment, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './App.module.css';
import Header from './components/Header/Header';
import Meetings from './components/Meetings/Meetings';
import Teams from './components/Teams/Teams';

import AuthFormConfig from './utils/AuthForm';
import Modal from './UI/Modal Container/Modal';
import Search from './UI/Search/Search';


function App() {
  const [addMeetingClicked, setAddMeetingClicked] = useState(false)
  const [addTeamClicked, setAddTeamClicked] = useState(false)
  const [searchClicked, setSearchClicked] = useState(false)
  const [tab, setTab] = useState('meeting')

  const isAuthenticated = !!useSelector(state => state.token)

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
        <div>
          <div><Search/></div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
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
