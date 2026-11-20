import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

export default function EventsPage() {
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Всі');

  const styles = {
    container: { maxWidth: '1000px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#ffffff', margin: 0 }, // Белый заголовок
    btnPrimary: { backgroundColor: '#818cf8', color: '#ffffff', padding: '0.6rem 1.2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', display: 'inline-block', transition: 'background-color 0.2s' },
    filterBar: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
    input: { flex: 1, minWidth: '200px', padding: '0.75rem 1rem', border: '1px solid #334155', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', backgroundColor: '#1e293b', color: '#ffffff' }, // Тёмный инпут
    select: { padding: '0.75rem 1rem', border: '1px solid #334155', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', backgroundColor: '#1e293b', color: '#ffffff' },
    // Тёмная карточка
    card: { backgroundColor: 'rgba(30, 41, 59, 0.8)', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)', transition: 'border-color 0.2s, transform 0.2s' },
    cardTitle: { fontSize: '1.25rem', fontWeight: '600', color: '#ffffff', margin: '0 0 0.5rem 0' },
    cardMeta: { color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 0.5rem 0' },
    badge: { fontSize: '0.75rem', backgroundColor: 'rgba(129, 140, 248, 0.1)', color: '#818cf8', padding: '0.25rem 0.75rem', borderRadius: '100px', fontWeight: '600' },
    btnDanger: { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'all 0.2s' },
    emptyText: { textAlign: 'center', marginTop: '40px', color: '#94a3b8', fontSize: '1.1rem' },
  };

  if (events.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={styles.title}>Список подій</h1>
        <p style={{ color: '#94a3b8', margin: '1rem 0' }}>Поки що немає жодної події.</p>
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
        <Link 
          to="/events/new" 
          style={styles.btnPrimary}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#818cf8'}
        >
          + Додати подію
        </Link>
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
            style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', textDecoration: 'underline', marginTop: '0.5rem', fontSize: '1rem' }}
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
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#818cf8'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div>
                <h3 style={styles.cardTitle}>{event.title}</h3>
                <p style={styles.cardMeta}>📅 {event.date} | 📍 {event.location}</p>
                <span style={styles.badge}>{event.category}</span>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }}
                style={styles.btnDanger}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; }}
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