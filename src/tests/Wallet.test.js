import { screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Testar pagina wallet', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });
  it('Testa se email total e BRL estão no Header', () => {
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
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    expect(history.location.pathname).toBe('/carteira');
    const valueInput = screen.getByTestId('value-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId('description-input');
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
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    expect(history.location.pathname).toBe('/carteira');

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

    const thLength = screen.getAllByTagName('th');

    expect(descriptionTHead).toBeInTheDocument();
    expect(tagTHead).toBeInTheDocument();
    expect(methodThead).toBeInTheDocument();
    expect(editRemoveTHead).toBeInTheDocument();
    expect(currencyMoneyTHead).toBeInTheDocument();
    expect(convertedValueTHead).toBeInTheDocument();
    expect(utilizedCurrencyTHead).toBeInTheDocument();
    expect(thLength.length).toBe(9);
  });
  it('Testa se apos apertar o botao de adicionar despesas é salvo as informações no estado global', () => {
    // const initialEntries = ['/carteira'];
    // const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira');
    // expect(history.location.pathname).toBe('/carteira');
    const valueInput = screen.getByTestId('value-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addDespesaBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    const credit = 'Cartão de crédito';

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'Um DOGE');
    userEvent.selectOptions(currencyInput, 'DOGE');
    userEvent.selectOptions(methodInput, credit);
    userEvent.selectOptions(tagInput, 'Transporte');
    act(() => {
      fireEvent.click(addDespesaBtn);
    });

    const savedGlobalDespesa1 = [
      {
        id: 0,
        value: '1',
        currency: 'DOGE',
        method: credit,
        tag: 'Transporte',
        description: 'Um DOGE',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toBe(savedGlobalDespesa1);

    userEvent.type(valueInput, '3');
    userEvent.type(descriptionInput, 'Tres EUR');
    userEvent.selectOptions(currencyInput, 'EUR');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Trabalho');
    act(() => {
      fireEvent.click(addDespesaBtn);
    });

    const savedGlobalDespesa2 = [
      {
        id: 0,
        value: '1',
        currency: 'DOGE',
        method: 'Dinheiro',
        tag: 'Transporte',
        description: 'Um DOGE',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '3',
        currency: 'EUR',
        method: 'Dinheiro',
        tag: 'Trabalho',
        description: 'Tres EUR',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toBe(savedGlobalDespesa2);
  });
  it('Testa se apos adicionado despesa e apertado o botao de excluir uma despesa é excluida', () => {
    // const initialEntries = ['/carteira'];
    // const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira');
    // expect(history.location.pathname).toBe('/carteira');

    const valueInput = screen.getByTestId('value-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addDespesaBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    const debit = 'Cartão de débito';

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'Um DOGE');
    userEvent.selectOptions(currencyInput, 'DOGE');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Transporte');
    act(() => {
      fireEvent.click(addDespesaBtn);
    });

    const savedGlobalDespesa1 = [
      {
        id: 0,
        value: '1',
        currency: 'DOGE',
        method: 'Dinheiro',
        tag: 'Transporte',
        description: 'Um DOGE',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toBe(savedGlobalDespesa1);

    userEvent.type(valueInput, '3');
    userEvent.type(descriptionInput, 'Tres EUR');
    userEvent.selectOptions(currencyInput, 'EUR');
    userEvent.selectOptions(methodInput, debit);
    userEvent.selectOptions(tagInput, 'Trabalho');
    act(() => {
      fireEvent.click(addDespesaBtn);
    });

    const savedGlobalDespesa2 = [
      {
        id: 0,
        value: '1',
        currency: 'DOGE',
        method: 'Dinheiro',
        tag: 'Transporte',
        description: 'Um DOGE',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '3',
        currency: 'EUR',
        method: debit,
        tag: 'Trabalho',
        description: 'Tres EUR',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toBe(savedGlobalDespesa2);

    const deleteBtn = screen.getByTestId('delete-btn');
    fireEvent.click(deleteBtn);

    expect(store.getState().wallet.expenses).toBe(savedGlobalDespesa1);
  });
  it('Testa se apos adicionado despesa e apertado o botao de excluir uma despesa é excluida', () => {
    // const initialEntries = ['/carteira'];
    // const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira');
    // expect(history.location.pathname).toBe('/carteira');

    const valueInput = screen.getByTestId('value-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId('description-input');
    const addDespesaBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    const credit = 'Cartão de crédito';
    const debit = 'Cartão de débito';

    userEvent.type(valueInput, '1');
    userEvent.type(descriptionInput, 'Um DOGE');
    userEvent.selectOptions(currencyInput, 'DOGE');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Transporte');
    act(() => {
      fireEvent.click(addDespesaBtn);
    });

    const savedGlobalDespesa1 = [
      {
        id: 0,
        value: '1',
        currency: 'DOGE',
        method: 'Dinheiro',
        tag: 'Transporte',
        description: 'Um DOGE',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toBe(savedGlobalDespesa1);

    userEvent.type(valueInput, '3');
    userEvent.type(descriptionInput, 'Tres EUR');
    userEvent.selectOptions(currencyInput, 'EUR');
    userEvent.selectOptions(methodInput, debit);
    userEvent.selectOptions(tagInput, 'Trabalho');
    act(() => {
      fireEvent.click(addDespesaBtn);
    });

    const savedGlobalDespesa2 = [
      {
        id: 0,
        value: '1',
        currency: 'DOGE',
        method: 'Dinheiro',
        tag: 'Transporte',
        description: 'Um DOGE',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '3',
        currency: 'EUR',
        method: debit,
        tag: 'Trabalho',
        description: 'Tres EUR',
        exchangeRates: mockData,
      },
    ];

    expect(store.getState().wallet.expenses).toBe(savedGlobalDespesa2);

    const editBtn = screen.getByTestId('edit-btn');
    fireEvent.click(editBtn);

    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'Dois USD');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, credit);
    userEvent.selectOptions(tagInput, 'Transporte');
    act(() => {
      fireEvent.click(addDespesaBtn);
    });

    const savedGlobalDespesa3 = [
      {
        id: 0,
        value: '2',
        currency: 'USD',
        method: credit,
        tag: 'Transporte',
        description: 'Dois USD',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '3',
        currency: 'EUR',
        method: debit,
        tag: 'Trabalho',
        description: 'Tres EUR',
        exchangeRates: mockData,
      },
    ];
    expect(store.getState().wallet.expenses).toBe(savedGlobalDespesa3);
  });
});
