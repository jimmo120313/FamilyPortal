import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import{useStore} from '../../app/stores/store';


const NavBar:React.FC = observer(() => {
  const {activityStore} = useStore();
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
            <img src="/assets/logo.png" alt="logo" style={{marginRight:'10px'}}/>
            Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item name="friends" >
            <Button onClick={()=>activityStore.openForm()} positive content='Create Activity'/>
        </Menu.Item>
      </Container>
    </Menu>
  );
});

export default NavBar