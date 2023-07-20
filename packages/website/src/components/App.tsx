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
        authorizerURL: 'https://auth.mykal.codes',
        redirectURL: window.location.origin,
        clientID: '083a8560-da36-4bf5-aa8b-ce9e4b344922', // obtain your client id from authorizer dashboard
        extraHeaders: {}, // Optional JSON object to pass extra headers in each authorizer requests.
      }}
    >
       <header>
          <h1>Profile Editor</h1>
          <button>logout</button>
        </header>
      <div className="wrapper">
        <LoginSignup />
        <Profile />
      </div>
    </AuthorizerProvider>
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
