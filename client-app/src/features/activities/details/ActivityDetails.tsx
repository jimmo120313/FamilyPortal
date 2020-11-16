import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { VoidExpression } from "typescript";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activity: IActivity;
  setEditMode:(editMode:boolean)=>void;
  setSelectedActivities:(activity:IActivity|null)=>void;
}

export const ActivityDetails: React.FC<IProps> = ({ activity,setEditMode,setSelectedActivities }) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
  <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group>
          <Button onClick={()=>setEditMode(true)} basic color="blue" content="Edit"></Button>
          <Button onClick={()=>setSelectedActivities(null)} basic color="grey" content="Cancel"></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
