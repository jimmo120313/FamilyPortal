import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from 'react';
import { Item, Button, Label, Segment } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { IActivity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";


export default observer(function ActivityList() {

  const {activityStore} = useStore();
  const {deleteActivity, activitiesByDate, loading} = activityStore;

  const [target, setTarget] = useState('');

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
  
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map(act => (
          <Item key={act.id}>
            <Item.Content>
              <Item.Header as="a">{act.title}</Item.Header>
              <Item.Meta>{act.date}</Item.Meta>
              <Item.Description>
                <div>{act.title}</div>
                <div>
                  {act.city},{act.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => activityStore.selectActivity(act.id)}
                  floated="right"
                  content="View"
                  color="blue"
                ></Button>
                  <Button
                  name={act.id}
                  
                  onClick={(e) => deleteActivity(act.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                ></Button>
                <Label basic content={act.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});

