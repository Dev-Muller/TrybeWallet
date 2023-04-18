import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const describeConst = 'description-input';
const tagConst = 'tag-input';
const methodConst = 'method-input';
const valueConst = 'value-input';
const currencyCons = 'currency-input';

describe('Testar pagina wallet', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(
        mockData,
      ),
    });
  });
  it('Testa se email, total e BRL estão no Header', () => {
    const initialEntries = ['/carteira'];
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });

    expect(history.location.pathname).toBe('/carteira');
    const email = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    const headerCurrency = screen.getByTestId('header-currency-field');

    expect(email).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(headerCurrency).toBeInTheDocument();
  });
  it('Testa se inputs estão presentes na wallet', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const valueInput = screen.getByTestId(valueConst);
    const currencyInput = screen.getByTestId(currencyCons);
    const methodInput = screen.getByTestId(methodConst);
    const tagInput = screen.getByTestId(tagConst);
    const descriptionInput = screen.getByTestId(describeConst);
    const addDespesaBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(valueInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addDespesaBtn).toBeInTheDocument();
  });
  it('Testa se a table head está com todas as informações presentes', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const descriptionTHead = screen.getByRole('columnheader', {
      name: /descrição/i,
    });
    const tagTHead = screen.getByRole('columnheader', {
      name: /tag/i,
    });
    const methodThead = screen.getByRole('columnheader', {
      name: /método de pagamento/i,
    });
    const editRemoveTHead = screen.getByRole('columnheader', {
      name: /editar\/excluir/i,
    });
    const currencyMoneyTHead = screen.getByRole('columnheader', {
      name: /moeda de conversão/i,
    });
    const convertedValueTHead = screen.getByRole('columnheader', {
      name: /valor convertido/i,
    });
    const utilizedCurrencyTHead = screen.getByRole('columnheader', {
      name: /câmbio utilizado/i,
    });

    expect(descriptionTHead).toBeInTheDocument();
    expect(tagTHead).toBeInTheDocument();
    expect(methodThead).toBeInTheDocument();
    expect(editRemoveTHead).toBeInTheDocument();
    expect(currencyMoneyTHead).toBeInTheDocument();
    expect(convertedValueTHead).toBeInTheDocument();
    expect(utilizedCurrencyTHead).toBeInTheDocument();
  });
  it('Testa se apos apertar o botao de adicionar despesas é salvo as informações no estado global', async () => {
    const initialEntries = ['/carteira'];
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries });

    expect(store.getState().wallet.expenses).toHaveLength(0);
    const valueInput = screen.getByTestId(valueConst);
    const descriptionInput = screen.getByTestId(describeConst);
    const addDespesaBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'Um USD');
    act(() => {
      userEvent.click(addDespesaBtn);
    });

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
    });
  });
  it('Testa se apos adicionar uma despesa no estado global e clicar no botao de excluir ele e excluido do estado global', async () => {
    const initialEntries = ['/carteira'];
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries });

    expect(store.getState().wallet.expenses).toHaveLength(0);
    const valueInput = screen.getByTestId(valueConst);
    const descriptionInput = screen.getByTestId(describeConst);
    const addDespesaBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'Um USD');
    act(() => {
      userEvent.click(addDespesaBtn);
    });

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
    });

    const removeBtn = screen.getByTestId('delete-btn');

    act(() => {
      userEvent.click(removeBtn);
    });

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(0);
    });
  });
  it('Testa se apos adicionado despesa e apertado o botao de editar uma despesa é editada e salva no estado global', async () => {
    const initialEntries = ['/carteira'];
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries });

    expect(store.getState().wallet.expenses).toHaveLength(0);
    const valueInput = screen.getByTestId(valueConst);
    const descriptionInput = screen.getByTestId(describeConst);
    const addDespesaBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(valueInput, '12');
    expect(valueInput.value).toBe('12');
    userEvent.type(descriptionInput, 'doze doletas');

    act(() => {
      userEvent.click(addDespesaBtn);
    });

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
      expect(screen.getByRole('cell', { name: /doze doletas/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /12\.00/i })).toBeInTheDocument();
    });

    const editBtn = screen.getByTestId('edit-btn');
    userEvent.click(editBtn);
    userEvent.type(valueInput, '20');
    userEvent.type(descriptionInput, 'vinte doletas');

    await waitFor(() => {
      const saveEdit = screen.getByRole('button', {
        name: /editar despesa/i,
      });

      act(() => {
        userEvent.click(saveEdit);
      });

      expect(screen.getByRole('cell', { name: /20\.00/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /vinte doletas/i })).toBeInTheDocument();
    });
  });
});
