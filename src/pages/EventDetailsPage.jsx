import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

export default function EventDetailsPage() {
  const { id } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Подію не знайдено</h2>
        <Link to="/events" style={{ color: '#4f46e5', marginTop: '1rem', display: 'inline-block' }}>Повернутися до списку</Link>
      </div>
    );
  }

  const handleRegister = () => {
    const updatedEvent = {
      ...event,
      isRegistered: true,
      participantsCount: (event.participantsCount || 0) + 1,
    };
    updateEvent(updatedEvent);
    alert('Ви успішно записані на подію!');
  };

  const styles = {
    container: { maxWidth: '700px', margin: '0 auto' },
    btnOutline: { backgroundColor: 'transparent', border: '1px solid #e5e7eb', color: '#111827', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.95rem' },
    card: { backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '2rem', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' },
    badge: { fontSize: '0.75rem', backgroundColor: '#e0e7ff', color: '#3730a3', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: '500' },
    title: { fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem', marginBottom: '1.5rem', color: '#111827' },
    infoRow: { display: 'flex', gap: '2rem', marginBottom: '1.5rem', color: '#111827' },
    hr: { border: 'none', borderTop: '1px solid #e5e7eb', margin: '1.5rem 0' },
    sectionTitle: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111827' },
    description: { whiteSpace: 'pre-wrap', color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' },
    footerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' },
    btnSuccess: { backgroundColor: '#10b981', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' },
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.btnOutline}>
        ← Назад
      </button>

      <div style={styles.card}>
        <span style={styles.badge}>{event.category}</span>
        <h1 style={styles.title}>{event.title}</h1>

        <div style={styles.infoRow}>
          <p><strong>📅 Дата:</strong> {event.date}</p>
          <p><strong>📍 Місце:</strong> {event.location}</p>
        </div>

        <hr style={styles.hr} />

        <h3 style={styles.sectionTitle}>Опис події</h3>
        <p style={styles.description}>
          {event.description || 'Опис відсутній.'}
        </p>

        <div style={styles.footerRow}>
          <div style={{ fontSize: '1.125rem', color: '#111827' }}>
            <strong>Учасників:</strong> {event.participantsCount || 0}
          </div>

          {event.isRegistered ? (
            <span style={{ color: '#10b981', fontWeight: '600' }}>✅ Ви вже записані</span>
          ) : (
            <button onClick={handleRegister} style={styles.btnSuccess} onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(0.9)'} onMouseOut={(e) => e.currentTarget.style.filter = 'none'}>
              Записатися
            </button>
          )}
        </div>
      </div>
    </div>
  );
}