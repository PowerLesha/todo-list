import React, { useState } from "react";
import styled from "styled-components";

const LoginWrap = styled.div`
  width: 100%;
  margin: auto;
  max-width: 525px;
  min-height: 470px;

  position: relative;
  background: url(https://raw.githubusercontent.com/khadkamhn/day-01-login-form/master/img/bg.jpg)
    no-repeat center;
  background-size: cover;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
`;

const LoginHtml = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 90px 70px 50px 70px;
  background: rgba(40, 57, 101, 0.9);
`;

const LoginForm = styled.div`
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
`;

const Group = styled.div`
  margin-bottom: 15px;
  margin-left: 50px;
`;

const Label = styled.label`
  color: #aaa;
  font-size: 12px;
`;

const Input = styled.input`
  width: 80%;
  color: #fff;
  display: flex;

  border: none;
  padding: 15px 20px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
`;

const Button = styled.input`
  width: 80%;
  color: #fff;
  display: inline;
  border: none;
  margin-inline-start: 20px;
  padding: 15px 20px;
  border-radius: 25px;
  background: #1161ee;
`;

const Hr = styled.div`
  height: 2px;
  margin: 60px 0 50px 0;
  background: rgba(255, 255, 255, 0.2);
`;

const Login = ({
  handleSignIn,
  handleSignUp,
  username,
  password,
  confirmPassword,
  setConfirmPassword,
  setUsername,
  setPassword,
  setEmail,
  email,
  error,
  signedUp,
}) => {
  const [signUp, setSignUp] = useState(false);

  return (
    <LoginWrap>
      <LoginHtml>
        <input
          onChange={() => setSignUp(false)}
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in"
          checked={!signUp}
        />
        <label htmlFor="tab-1" className="tab">
          Sign In
        </label>
        <input
          checked={signUp}
          onChange={() => setSignUp(true)}
          id="tab-2"
          type="radio"
          name="tab"
          className="sign-up"
        />
        <label htmlFor="tab-2" className="tab">
          Sign Up
        </label>

        <LoginForm>
          {!signUp && (
            <div className="sign-in-htm">
              <Group>
                <Label htmlFor="user" className="label">
                  Username
                </Label>
                <Input
                  id="user"
                  type="text"
                  placeholder="Username"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Group>
              <Group>
                <Label htmlFor="pass" className="label">
                  Password
                </Label>
                <Input
                  id="pass"
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="input"
                  data-type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Group>
              <div className="login_error">
                {error &&
                  error.some(
                    (err) => err.errorType === "invalidCredentials"
                  ) && (
                    <p style={{ color: "red", marginLeft: "50px" }}>
                      {
                        error.find(
                          (err) => err.errorType === "invalidCredentials"
                        )?.message
                      }
                    </p>
                  )}
              </div>
              <Group>
                <input id="check" type="checkbox" className="check" checked />
                <Label htmlFor="check">
                  <span className="icon"></span> Keep me Signed in
                </Label>
              </Group>
              <Group>
                <Button
                  onClick={handleSignIn}
                  type="submit"
                  className="button"
                  value="Sign In"
                />
              </Group>
              <Hr />
              <div className="foot-lnk">Forgot Password?</div>
            </div>
          )}
          {signUp && (
            <div className="sign-up-htm">
              <Group>
                <Label htmlFor="user" className="label">
                  Username
                </Label>
                <Input
                  id="user"
                  type="text"
                  placeholder="Username"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="login_error">
                  {error &&
                    error.some((err) => err.errorType === "emptyUsername") && (
                      <p style={{ color: "red" }}>
                        {
                          error.find((err) => err.errorType === "emptyUsername")
                            ?.message
                        }
                      </p>
                    )}
                </div>
                <div className="login_error">
                  {error &&
                    error.some((err) => err.errorType === "usernameTaken") && (
                      <p style={{ color: "red" }}>
                        {
                          error.find((err) => err.errorType === "usernameTaken")
                            ?.message
                        }
                      </p>
                    )}
                </div>
              </Group>
              <Group>
                <Label htmlFor="pass" className="label">
                  Password
                </Label>
                <Input
                  id="pass"
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="input"
                  data-type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="login_error">
                  {error &&
                    error.some((err) => err.errorType === "emptyPassword") && (
                      <p style={{ color: "red" }}>
                        {
                          error.find((err) => err.errorType === "emptyPassword")
                            ?.message
                        }
                      </p>
                    )}
                </div>
              </Group>
              <Group>
                <Label htmlFor="pass" className="label">
                  Repeat Password
                </Label>
                <Input
                  id="pass"
                  value={confirmPassword}
                  placeholder="Repeat password please"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className="input"
                  data-type="password"
                />
                <div className="login_error">
                  {error &&
                    error.some(
                      (err) => err.errorType === "passwordMismatch"
                    ) && (
                      <p style={{ color: "red" }}>
                        {
                          error.find(
                            (err) => err.errorType === "passwordMismatch"
                          )?.message
                        }
                      </p>
                    )}
                </div>
              </Group>
              <Group>
                <Label htmlFor="pass" className="label">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  className="input"
                  data-type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="login_error">
                  {error &&
                    error.some((err) => err.errorType === "emptyEmail") && (
                      <p style={{ color: "red" }}>
                        {
                          error.find((err) => err.errorType === "emptyEmail")
                            ?.message
                        }
                      </p>
                    )}
                </div>
                <div className="login_error">
                  {error &&
                    error.some((err) => err.errorType === "emailTaken") && (
                      <p style={{ color: "red" }}>
                        {
                          error.find((err) => err.errorType === "emailTaken")
                            ?.message
                        }
                      </p>
                    )}
                </div>
              </Group>
              <Group>
                <Button
                  onClick={handleSignUp}
                  type="submit"
                  className="button"
                  value="Sign Up"
                />
              </Group>
              {signedUp && (
                <h2 style={{ marginLeft: "110px" }}>Thank's for Signed Up!</h2>
              )}
              <Hr />
              <div className="foot-lnk">
                <label htmlFor="tab-1" style={{ cursor: "pointer" }}>
                  Already Member?
                </label>
              </div>
            </div>
          )}
        </LoginForm>
      </LoginHtml>
    </LoginWrap>
  );
};

export default Login;
