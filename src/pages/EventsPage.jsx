import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

export default function EventsPage() {
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Всі');

  // Стили (вынесены в константы для читаемости)
  const styles = {
    container: { maxWidth: '1000px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 },
    btnPrimary: { backgroundColor: '#4f46e5', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', display: 'inline-block' },
    filterBar: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
    input: { flex: 1, minWidth: '200px', padding: '0.625rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' },
    select: { padding: '0.625rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit' },
    card: { backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' },
    cardTitle: { fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: '0 0 0.25rem 0' },
    cardMeta: { color: '#6b7280', fontSize: '0.875rem', margin: '0 0 0.5rem 0' },
    badge: { fontSize: '0.75rem', backgroundColor: '#e0e7ff', color: '#3730a3', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: '500' },
    btnDanger: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' },
    emptyText: { textAlign: 'center', marginTop: '30px', color: '#6b7280' },
    link: { color: '#4f46e5', textDecoration: 'underline', cursor: 'pointer' },
  };

  if (events.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={styles.title}>Список подій</h1>
        <p style={{ color: '#6b7280', margin: '1rem 0' }}>Поки що немає жодної події.</p>
        <Link to="/events/new" style={styles.btnPrimary}>Створити першу подію</Link>
      </div>
    );
  }

  const categories = ['Всі', 'Конференція', 'Воркшоп', 'Мітап', 'Вечірка'];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Всі' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Список подій</h1>
        <Link to="/events/new" style={styles.btnPrimary}>+ Додати подію</Link>
      </div>

      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Пошук за назвою..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <div style={styles.emptyText}>
          <p>За вашим запитом нічого не знайдено.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('Всі'); }}
            style={{ background: 'none', border: 'none', ...styles.link, marginTop: '0.5rem' }}
          >
            Скинути фільтри
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/events/${event.id}`)}
              style={styles.card}
              onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)'}
            >
              <div>
                <h3 style={styles.cardTitle}>{event.title}</h3>
                <p style={styles.cardMeta}>📅 {event.date} | 📍 {event.location}</p>
                <span style={styles.badge}>{event.category}</span>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }}
                style={styles.btnDanger}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
              >
                Видалити
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}