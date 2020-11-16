import React, { useState, useEffect, Fragment } from "react";
import { Header, Icon, Container, List } from "semantic-ui-react";
import "./styles.css";
import { Component } from "react";
import Axios from "axios";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [
    selectedActivities,
    setSelectedActivities,
  ] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectAcrtivity = (id: string) => {
    setSelectedActivities(activities.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivities(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivities(activity);
    setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) => {
    setActivities([
      ...activities.filter((a) => a.id !== activity.id),
      activity,
    ]);
    setSelectedActivities(activity);
    setEditMode(false);
  };

  const handleDeleteActivity=(id:string)=>{
    setActivities([...activities.filter(a=>a.id!==id)])
  }

  useEffect(() => {
    Axios.get<IActivity[]>("http://localhost:5000/api/activities").then(
      (response) => {
        let activities: IActivity[]=[];
        response.data.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      }
    );
  }, []);

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
        />
      </Container>
    </Fragment>
  );
};
export default App;
