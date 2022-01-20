import validator from 'validator';

/*form and inputs*/
const form = document.querySelector('#form') as HTMLFormElement;
const user = document.querySelector('#username') as HTMLInputElement;
const email = document.querySelector('#email') as HTMLInputElement;
const password = document.querySelector('#password') as HTMLInputElement;
const confirmPassword = document.querySelector(
  '#password2'
) as HTMLInputElement;
/*form and inputs*/

function validationUser(userClient: string): boolean {
  hideErrorMessage(user);
  if (validator.isAlphanumeric(userClient)) return true;
  if (userClient === '') showErrorMessage(user, 'Usuário em branco');
  else
    showErrorMessage(
      user,
      'Usuário inválido. Permitido apenas carácteres alfanuméricos.'
    );
  return false;
}

function validationEmail(emailClient: string): boolean {
  hideErrorMessage(email);
  if (validator.isEmail(emailClient)) return true;
  if (emailClient === '') showErrorMessage(email, 'Email em branco');
  else showErrorMessage(email, 'Email inválido');
  return false;
}

function validationPassword(pass: string, confirmPass: string): boolean {
  hideErrorMessage(password);
  hideErrorMessage(confirmPassword);
  if (pass === confirmPass && pass !== '' && confirmPass !== '') {
    return true;
  }
  if (pass !== confirmPass) {
    password.value = '';
    confirmPassword.value = '';
    showErrorMessage(password, 'Senhas diferentes');
    showErrorMessage(confirmPassword, 'Senhas diferentes');
  }
  if (pass === '' && confirmPass === '') {
    showErrorMessage(password, 'Senhas em branco');
    showErrorMessage(confirmPassword, 'Senhas em branco');
  }
  return false;
}

function hideErrorMessage(input: HTMLInputElement): void {
  const parent = input.parentElement as HTMLDivElement;
  parent.classList.remove('show-error-message');
}

function showErrorMessage(input: HTMLInputElement, msg: string): void {
  const parent = input.parentElement as HTMLDivElement;
  const errMessage = parent.querySelector('.error-message') as HTMLSpanElement;
  errMessage.innerHTML = msg;
  parent.classList.add('show-error-message');
}

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  const validatedUser = !validationUser(user.value);
  const validatedEmail = !validationEmail(email.value);
  const validatedPassword = !validationPassword(
    password.value,
    confirmPassword.value
  );
  if (validatedUser || validatedEmail || validatedPassword) {
    alert('Cadastro falhou, verifique os dados e corrija os erros.');
    return false;
  }
  alert('Cadastro realizado com sucesso!');
});
