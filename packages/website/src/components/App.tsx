import {
  AuthorizerProvider,
  Authorizer,
  useAuthorizer,
} from '@authorizerdev/authorizer-react';
import ProfileForm from './ProfileForm';
import ProfileCard from './ProfileCard';

const App = () => {
  return (
    <AuthorizerProvider
      config={{
        clientID: import.meta.env.PUBLIC_AUTHORIZER_URL as string,
        authorizerURL: import.meta.env.PUBLIC_AUTHORIZER_CLIENT_ID as string,
        redirectURL: window.location.origin,
      }}
    >
      <Header />
      <div className="wrapper">
        <LoginSignup />
        <Profile />
      </div>
    </AuthorizerProvider>
  );
};

const Header = () => {
  const { user, logout } = useAuthorizer();

  return (
    <header>
      <h1>Profile Editor</h1>
      {user && (<button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>)}
    </header>
  );
};

const LoginSignup = () => {
  const { user } = useAuthorizer();
  if (user) {
    return null;
  } else {
    return <Authorizer roles={['admin']} />;
  }
};

const Profile = () => {
  const { user } = useAuthorizer();

  if (user) {
    return (
      <>
        <ProfileCard />
        <ProfileForm />
      </>
    );
  }

  return null;
};

export default App;
