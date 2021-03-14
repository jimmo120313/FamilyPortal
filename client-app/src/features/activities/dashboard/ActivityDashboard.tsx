import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import {useStore} from '../../../app/stores/store'


export default observer(function ActivityDashboard() {

  const {activityStore} = useStore();
  const { editMode, selectedActivity } = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList/>
      </Grid.Column>                                                                                                                                                     
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails/>
        )}
        {editMode && (
          <ActivityForm/>
        )}
      </Grid.Column>
    </Grid>
  );
});

