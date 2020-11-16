import React, { ChangeEvent, useState } from "react";
import { FormEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import{v4 as uuid} from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity:(activity:IActivity)=>void;
  editActivity:(activity:IActivity)=>void; 
  
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(initializeForm);
  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  const handleSubmit=()=>{
    if(activity.id.length===0){
        let newActivity={
            ...activity,
            id: uuid()
        }
        createActivity(newActivity);
    }else{
        editActivity(activity);
    }
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
          onClick={() => setEditMode(false)}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
