import classes from './App.module.css';
import { Fragment, useState } from 'react';
import Header from './components/Header/Header';
import Meetings from './components/Meetings/Meetings';
import Teams from './components/Teams/Teams';

function App() {
  const [addMeetingClicked, setAddMeetingClicked] = useState(false)
  const onAddMeetingClick = e => {
    setAddMeetingClicked(prev => prev = !prev);
  }

  return (
    <Fragment>
      <Header onAddMeetingClick={onAddMeetingClick}/>
      {/* <Meetings displayForm={addMeetingClicked}/> */}
      <Teams 
        showModal={addMeetingClicked}
        onToggleModal={onAddMeetingClick}
      />
    </Fragment>
  );
}

export default App;
