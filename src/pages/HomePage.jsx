import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

export default function HomePage() {
  const { events } = useEvents();

  // Берем первые 3 события для превью (или сколько есть)
  const recentEvents = events.slice(0, 3);

  const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '3rem', marginTop: '2rem' },
    hero: { 
      textAlign: 'center', 
      padding: '4rem 2rem', 
      backgroundColor: '#ffffff', 
      borderRadius: '16px', 
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    heroTitle: { fontSize: '3rem', fontWeight: '800', color: '#111827', marginBottom: '1rem', lineHeight: '1.2' },
    heroSubtitle: { fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' },
    btnGroup: { display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' },
    btnPrimary: { backgroundColor: '#4f46e5', color: 'white', padding: '1rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '1.1rem', display: 'inline-block' },
    btnSecondary: { backgroundColor: 'transparent', color: '#4f46e5', padding: '1rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '1.1rem', border: '2px solid #4f46e5', display: 'inline-block' },
    sectionTitle: { fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
    card: { backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    cardTitle: { fontSize: '1.25rem', fontWeight: '600', color: '#111827', margin: 0 },
    cardMeta: { color: '#6b7280', fontSize: '0.9rem', margin: 0 },
    emptyText: { color: '#6b7280', fontStyle: 'italic' }
  };

  return (
    <div style={styles.container}>
      {/* Баннер */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Керуйте подіями легко</h1>
        <p style={styles.heroSubtitle}>
          Створюйте івенти, запрошуйте учасників та слідкуйте за розкладом в одному місці.
        </p>
        <div style={styles.btnGroup}>
          <Link to="/events/new" style={styles.btnPrimary}>Створити подію</Link>
          <Link to="/events" style={styles.btnSecondary}>Переглянути всі</Link>
        </div>
      </section>

      {/* Ближайшие события */}
      <section>
        <h2 style={styles.sectionTitle}>Останні події</h2>
        {recentEvents.length === 0 ? (
          <p style={styles.emptyText}>Ви ще не створили жодної події. Час це виправити!</p>
        ) : (
          <div style={styles.grid}>
            {recentEvents.map((event) => (
              <Link 
                key={event.id} 
                to={`/events/${event.id}`} 
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={styles.card}>
                  <span style={{ alignSelf: 'flex-start', fontSize: '0.75rem', backgroundColor: '#e0e7ff', color: '#3730a3', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: '500', marginBottom: '0.5rem' }}>
                    {event.category}
                  </span>
                  <h3 style={styles.cardTitle}>{event.title}</h3>
                  <p style={styles.cardMeta}>📅 {event.date}</p>
                  <p style={styles.cardMeta}>📍 {event.location}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}