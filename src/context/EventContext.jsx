import { createContext, useContext, useState, useEffect } from 'react';

// Создаём контекст
const EventContext = createContext();

// Создаём провайдер (он будет оборачивать всё приложение)
export function EventProvider({ children }) {
  // Инициализируем состояние. Пытаемся взять данные из localStorage или начинаем с пустого массива.
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : [];
  });

  // Сохраняем в localStorage при каждом изменении массива events
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Функция для добавления события
  const addEvent = (newEvent) => {
    setEvents((prev) => [...prev, { ...newEvent, id: Date.now().toString() }]);
  };

  // Функция для удаления события
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  // Функция для обновления события (например, при записи участника)
  const updateEvent = (updatedEvent) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };

  // Передаём в контекст всё, что нужно компонентам
  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
}

// Удобный хук для использования контекста в компонентах
export function useEvents() {
  return useContext(EventContext);
}