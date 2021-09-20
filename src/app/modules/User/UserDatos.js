import React, {Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import UserDatosHeader from "./UserDatosHeader";
import UserDatosFormStep1 from "./UserDatosFormStep1";
import UserDatosFormStep2 from "./UserDatosFormStep2";
import UserDatosFormStep3 from "./UserDatosFormStep3";
import UserDatosFormStep4 from "./UserDatosFormStep4";


const UserDatos = (props) => {

  return (
    <Fragment>
      <UserDatosHeader/>

      <br/>

      <UserDatosFormStep1 />

      {/*<UserDatosFormStep2 />*/}

      {/*<UserDatosFormStep3 />*/}

      {/*<UserDatosFormStep4 />*/}

    </Fragment>
  );
}

export default UserDatos;