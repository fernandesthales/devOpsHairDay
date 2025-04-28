/**
 * @jest-environment jsdom
 */
import { scheduleNew } from '../src/services/schedule-new.js';

global.fetch = jest.fn();
global.alert = jest.fn();

describe('scheduleNew', () => {
  const fakeData = {
    id: '12345',
    name: 'Cliente Teste',
    when: '2025-05-01T10:00:00',
  };

  beforeEach(() => {
    fetch.mockClear();
    alert.mockClear();
  });

  test('deve chamar fetch com a URL correta', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    await scheduleNew(fakeData);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/schedules'), expect.any(Object));
  });

  test('deve usar o método POST', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    await scheduleNew(fakeData);

    const options = fetch.mock.calls[0][1];
    expect(options.method).toBe('POST');
  });

  test('deve enviar o corpo correto', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    await scheduleNew(fakeData);

    const options = fetch.mock.calls[0][1];
    expect(options.body).toBe(JSON.stringify(fakeData));
  });

  test('deve exibir alerta de sucesso', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    await scheduleNew(fakeData);

    expect(alert).toHaveBeenCalledWith("Agendamento realizado com sucesso!");
  });

  test('deve exibir alerta de erro em caso de falha no fetch', async () => {
    fetch.mockRejectedValueOnce(new Error('Erro de conexão'));

    await scheduleNew(fakeData);

    expect(alert).toHaveBeenCalledWith("Não foi possível agendar. Tente novamente depois");
  });
});
