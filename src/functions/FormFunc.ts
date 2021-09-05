export const preventEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
};

export const emailValidate: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const passwordValidate: RegExp = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,200}$/i;

export const requiredErrorMessage: string = "⚠必須です";
export const emailErrorMessage: string = "⚠無効なメールアドレスです";
export const passwordErrorMessage: string = "⚠英数字をそれぞれ１字以上含みかつ６文字以上である必要があります";
export const passwordConfirmErrorMessage: string = "⚠パスワードと一致していません";