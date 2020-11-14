import React, { useState, useEffect,Fragment } from "react";
import { Header, Icon, Container,List } from "semantic-ui-react";
import "./styles.css";
import { Component } from "react";
import Axios from "axios";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    Axios.get<IActivity[]>("http://localhost:5000/api/activities").then(
      (response) => {
        setActivities(response.data);
      }
    );
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        {/* <List>
          <ul>
            {activities.map((value: IActivity) => {
              return <li key={value.id}>{value.title}</li>;
            })}
          </ul>
        </List> */}
        <ActivityDashboard activities={activities} />
      </Container>
    </Fragment>
  );
};
export default App;
