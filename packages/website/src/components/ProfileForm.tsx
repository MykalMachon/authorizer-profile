import { useState } from 'react';
import { useAuthorizer } from '@authorizerdev/authorizer-react';

const ProfileForm = () => {
  const { user, setUser, authorizerRef } = useAuthorizer();

  if (!user) {
    return <p>please sign in</p>;
  }

  const [formLoading, setFormLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const newUserData = Object.fromEntries(formData.entries());
    const { access_token } = await authorizerRef.getSession();
    await authorizerRef.updateProfile(newUserData, {
      Authorization: `Bearer ${access_token}`
    });
    const newUser = await authorizerRef.getProfile({ Authorization: `Bearer ${access_token}` });
    if (newUser) setUser(newUser);
    setFormLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="given_name">
        First Name*
        <input
          type="text"
          name="given_name"
          id="given_name"
          defaultValue={user.given_name || ''}
          required
        />
      </label>
      <label htmlFor="family_name">
        Last Name*
        <input
          type="text"
          name="family_name"
          id="family_name"
          defaultValue={user.family_name || ''}
          required
        />
      </label>
      <label htmlFor="email">
        Email*
        <input
          type="text"
          name="email"
          id="email"
          defaultValue={user.email || ''}
          disabled={true}
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
      <button type="submit" disabled={formLoading}>
        {formLoading ? 'Loading...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default ProfileForm;
