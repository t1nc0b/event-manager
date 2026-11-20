import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import { EventProvider } from './context/EventContext';

describe('HomePage', () => {
  it('рендерит главный заголовок', () => {
    render(
      <EventProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </EventProvider>
    );
    // Ищем новый текст заголовка, который мы поставили в дизайне
    expect(screen.getByText(/Створюйте події,/i)).toBeInTheDocument();
  });
});

describe('Layout', () => {
  it('содержит ссылки навигации', () => {
    render(
      <EventProvider>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </EventProvider>
    );
    // Проверяем ссылки в шапке
    expect(screen.getByText(/Головна/i)).toBeInTheDocument();
    expect(screen.getByText(/Події/i)).toBeInTheDocument();
    expect(screen.getByText(/Створити/i)).toBeInTheDocument();
  });
});