import React, {  useContext, useState } from "react";
import { FormEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import{v4 as uuid} from 'uuid';
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { checkIfStateModificationsAreAllowed } from "mobx/dist/internal";


export default observer(function ActivityForm() {
  const {activityStore} = useStore();
  const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;
  

  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  }
  const [activity, setActivity] = useState(initialState);
  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  function handleSubmit() {
    activity.id ? updateActivity(activity) : createActivity(activity);
}

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input placeholder="Title" name="title" onChange={handleInputChange} value={activity.title} />
        <Form.TextArea
          rows="2"
          name="description" onChange={handleInputChange} 
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input placeholder="Category" name="category" onChange={handleInputChange}  value={activity.category} />
        <Form.Input type="datetime-local" name="date" onChange={handleInputChange}  placeholder="Date" value={activity.date} />
        <Form.Input placeholder="City" name="city" onChange={handleInputChange}  value={activity.city} />
        <Form.Input placeholder="Venue" name="venue" onChange={handleInputChange}  value={activity.venue} />
        <Button
          // onClick={() => {debugger;setEditMode(false)}}
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
});

