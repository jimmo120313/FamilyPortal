import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container} from "semantic-ui-react";
import "./styles.css";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [
    selectedActivities,
    setSelectedActivities,
  ] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectAcrtivity = (id: string) => {
    setSelectedActivities(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivities(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities, activity]);
      setSelectedActivities(activity);
      setEditMode(false);
    }).then(()=>setSubmitting(false))
    
    
  };

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(()=>{
      setActivities([
        ...activities.filter((a) => a.id !== activity.id),
        activity,
      ]);
      setSelectedActivities(activity);
      setEditMode(false);
    }).then(()=>setSubmitting(false))
    
  };

  const handleDeleteActivity=(event:SyntheticEvent<HTMLButtonElement>, id:string)=>{
    setSubmitting(true);
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(a=>a.id!==id)])
    }).then(()=>setSubmitting(false))
  }

  useEffect(() => {
    agent.Activities.list().then(
      (response) => {
        let activities: IActivity[]=[];
        response.forEach((activity:IActivity) => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      }
    ).then(()=>setLoading(false));
  }, []);
if(loading) return <LoadingComponent content='Loading activities...'/>
  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectAcrtivity}
          selectedActivity={selectedActivities!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivities={setSelectedActivities}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};
export default App;
