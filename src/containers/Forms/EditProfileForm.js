import { asyncActions } from "../../redux/modules/entities/users";
import EditProfileForm from "../../components/Forms/EditProfileForm";
import { connect } from "react-redux";
import { push } from "connected-react-router";

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {
  push,
  editUser: asyncActions.editUser
})(EditProfileForm);
