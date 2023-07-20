import { useAuthorizer } from '@authorizerdev/authorizer-react';

const ProfileCard = () => {
  const { user } = useAuthorizer();

  if (!user) {
    return <p>please sign in</p>;
  }

  return (
    <section className="profile-card">
      <img
        src={user.picture || `https://unavatar.io/${user.email}`}
        alt=""
        className="pfp"
      />
      <h2>
        {user.given_name && user.family_name ? (
          <>
            {user.given_name} {user.family_name}
          </>
        ) : (
          <>{user.email}</>
        )}
      </h2>
      <p>email: {user.email}</p>
      <p>roles: {user.roles?.map((role, idx ) => <>{role}{idx != user.roles.length - 1 && ', '}</>)}</p>
    </section>
  );
};

export default ProfileCard;