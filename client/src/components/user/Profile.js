import './Profile.css';

export default function Profile(props) {
  return (
    <div id="profile">
      <div id="profile-header">
        <h1>{props.session.user.username}'s Profile</h1>
      </div>
    </div>
  );
};