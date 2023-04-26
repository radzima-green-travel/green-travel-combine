export interface CheckEmailFormModel {
  email: string;
}

export interface SignUpFormModel {
  password: string;
}

export interface SignInFormModel {
  password: string;
}

export interface ForgotPasswordEmailFormModel {
  email: string;
}

export interface ValidationCodeFormModel {
  code: string;
}

export interface NewPasswordFormModel {
  code: string;
  password: string;
}

export interface ChangePasswordFormModel {
  oldPassword: string;
  newPassword: string;
}
