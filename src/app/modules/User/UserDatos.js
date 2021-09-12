import React, {Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import UserDatosHeader from "./UserDatosHeader";
import UserDatosFormStep1 from "./UserDatosFormStep1";
import UserDatosFormStep2 from "./UserDatosFormStep2";


const UserDatos = (props) => {

  return (
    <Fragment>
      <UserDatosHeader/>

      <br/>

      <UserDatosFormStep1 />

      {/*<UserDatosFormStep2 />*/}

    </Fragment>
  );
}

export default UserDatos;