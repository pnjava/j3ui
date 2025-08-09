import { useContext, useEffect, useState } from "react";
// import { redirect } from "react-router-dom";
import { StoreContext } from "../context/Store";

const LoginForm: React.FC<object> = () => {
  const { state, user, UserService, RestService } = useContext(StoreContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    const credentials = {
      username,
      password,
    };

    // await UserService.login(credentials);

    // return redirect("/facilities");
  };

  useEffect(() => {
    console.log("user: ", user);
    RestService?.saveStateSession(state);
  }, [state]);

  return (
    <>
      <section className="">
        <form onSubmit={submitForm}>
          <div className="">
            <label className="">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              className="border rounded py-2 px-3 mb-2"
              placeholder="enter your username"
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div className="">
            <label className="">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded py-2 px-3 mb-2"
              placeholder="enter your password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </section>

      {user?.profile?.isLoading && (
        <div>
          <h3>Logging in user...</h3>
        </div>
      )}

      {user?.profile?.isLoading === false &&
        user?.profile?.data?.['response'].length > 0 && (
          <div>
            <h3>{username} logged in</h3>
          </div>
        )}
    </>
  );
};

export default LoginForm;
