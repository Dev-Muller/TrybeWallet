import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testar pagina de login', () => {
  it('Testa se os inputs e botao estao presentes', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const login = screen.getByTestId('btn-login');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(login).toBeInTheDocument();

    userEvent.click(login);

    expect(history.location.pathname).toBe('/carteira');
  });

  it('Testa se apos preencher os inputs e clicar no botao leva a carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const login = screen.getByTestId('btn-login');

    userEvent.type(email, 'asd@email.com');
    userEvent.type(password, 'asdasd');
    userEvent.click(login);

    expect(history.location.pathname).toBe('/carteira');
  });
});
