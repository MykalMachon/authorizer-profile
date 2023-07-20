import { useAuthorizer } from '@authorizerdev/authorizer-react';

const ProfileForm = () => {
  const { user } = useAuthorizer();

  if (!user) {
    return <p>please sign in</p>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="given_name">
        First Name
        <input
          type="text"
          name="given_name"
          id="given_name"
          defaultValue={user.given_name || ''}
        />
      </label>
      <label htmlFor="family_name">
        Last Name
        <input
          type="text"
          name="family_name"
          id="family_name"
          defaultValue={user.family_name || ''}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          id="email"
          defaultValue={user.email || ''}
        />
      </label>
      <label htmlFor="nickname">
        Nickname
        <input
          type="text"
          name="nickname"
          id="nickname"
          defaultValue={user.nickname || ''}
        />
      </label>
      <label htmlFor="picture">
        Picture URL
        <input
          type="url"
          name="picture"
          id="picture"
          defaultValue={user.picture || ''}
        />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
