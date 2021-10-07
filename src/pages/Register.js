import { useForm } from "react-hook-form";
import axios from "commons/axios";
import { toast } from "react-toastify";

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const { nickname, email, password } = data;
      const res = await axios.post("/auth/register", {
        nickname,
        email,
        password,
        type: 0,
      });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      console.log(jwToken);
      toast.success("註冊成功");
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
          <label className="label">暱稱</label>
          <div className="control">
            <input
              className={`input ${errors.nickname && "is-danger"}`}
              name="nickname"
              type="text"
              placeholder="nickname"
              {...register("nickname", {
                required: "需要填寫暱稱",
              })}
            />
            {errors.nickname && (
              <p className="helper has-text-danger">
                {errors.nickname.message}
              </p>
            )}
          </div>
        </div>
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
        <br />
        <div className="control">
          <button className="button is-fullwidth is-primary">確認</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
