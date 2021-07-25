import classes from './App.module.css';
import { Fragment, useState } from 'react';
import Header from './components/Header/Header';
import Meetings from './components/Meetings/Meetings';
import Teams from './components/Teams/Teams';

function App() {
  const [addMeetingClicked, setAddMeetingClicked] = useState(false)
  const [addTeamClicked, setAddTeamClicked] = useState(false)
  const [tab, setTab] = useState('meeting')
  
  const onAddMeetingClick = () => {
    setAddMeetingClicked(prev => !prev);
  }
  const onAddTeamClick = () => {
    setAddTeamClicked(prev => !prev);
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

  const content = (
    tab === 'meeting' ? 
    <Meetings displayForm={addMeetingClicked}/> :
    <Teams 
        showModal={addTeamClicked}
        onToggleModal={onAddTeamClick}
    />
  )

  return (
    <Fragment>
      <Header 
        clicked={clickState}
        onClickHandler={onClickHandler}
        onChangeTab={onChangeTab}
        currTab={tab}
      />
      { content }
    </Fragment>
  );
}

export default App;
