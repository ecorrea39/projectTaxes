import React, {useState} from "react";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";

const AuthHeader = () => {

  return(
    <div className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
              <span className="font-weight-bold text-dark-50">
                <FormattedMessage id="AUTH.LOGIN.ASK" />
              </span>
      <Link
        to="/auth/registration"
        className="font-weight-bold ml-2"
        id="kt_login_signup"
      >
        <FormattedMessage id="AUTH.LOGIN.SIGNUP" />
      </Link>
    </div>
  );
}

export default AuthHeader;