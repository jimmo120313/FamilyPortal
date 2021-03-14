import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container} from "semantic-ui-react";
import "./styles.css";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import {useStore} from '../stores/store';
import {v4 as uuid} from 'uuid';

const App = observer(() => {
  
  const {activityStore} = useStore();
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [
    selectedActivities,
    setSelectedActivities,
  ] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");



  function handleCreateOrEditActivity(activity: IActivity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  const handleDeleteActivity=(id:string)=>{
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      debugger;
      setActivities([...activities.filter(a=>a.id!==id)])
    }).then(()=>setSubmitting(false))
  }

  useEffect( () => {
    activityStore.loadActivities();
  }, [activityStore]);
if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities...'/>
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard/>
      </Container>
    </Fragment>
  );
});
export default App;
