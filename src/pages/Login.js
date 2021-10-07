import { useForm } from "react-hook-form";
import axios from "commons/axios";
import { toast } from "react-toastify";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const res = await axios.post("/auth/login", { email, password });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      toast.success("登入成功");
      props.history.push("/");
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">電子信箱</label>
          <div className="control">
            <input
              className={`input ${errors.email && "is-danger"}`}
              name="email"
              type="text"
              placeholder="email"
              {...register("email", {
                required: "需要填寫信箱",
                pattern: {
                  value:
                    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                  message: "格式錯誤",
                },
              })}
            />
            {errors.email && (
              <p className="helper has-text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">密碼</label>
          <div className="control">
            <input
              className={`input ${errors.password && "is-danger"}`}
              name="password"
              type="password"
              placeholder="password"
              {...register("password", {
                required: "需要填寫密碼",
                minLength: {
                  value: 6,
                  message: "密碼需要大於6位數",
                },
              })}
            />
            {errors.password && (
              <p className="helper has-text-danger">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="control">
          <button className="button is-fullwidth is-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
