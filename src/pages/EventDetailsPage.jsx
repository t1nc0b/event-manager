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
        <h2 style={{ color: '#ffffff' }}>Подію не знайдено</h2>
        <Link to="/events" style={{ color: '#818cf8', marginTop: '1rem', display: 'inline-block' }}>Повернутися до списку</Link>
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
    btnOutline: { backgroundColor: 'transparent', border: '1px solid #334155', color: '#e2e8f0', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.95rem', transition: 'background-color 0.2s' },
    card: { backgroundColor: 'rgba(30, 41, 59, 0.8)', border: '1px solid #334155', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)' },
    badge: { fontSize: '0.75rem', backgroundColor: 'rgba(129, 140, 248, 0.1)', color: '#818cf8', padding: '0.25rem 0.75rem', borderRadius: '100px', fontWeight: '600' },
    title: { fontSize: '2.5rem', fontWeight: '800', marginTop: '1rem', marginBottom: '1.5rem', color: '#ffffff', lineHeight: '1.2' },
    infoRow: { display: 'flex', gap: '2rem', marginBottom: '1.5rem', color: '#e2e8f0', fontSize: '1.1rem' },
    hr: { border: 'none', borderTop: '1px solid #334155', margin: '2rem 0' },
    sectionTitle: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#ffffff' },
    description: { whiteSpace: 'pre-wrap', color: '#94a3b8', lineHeight: '1.8', marginBottom: '2rem', fontSize: '1.05rem' },
    footerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid #334155' },
    btnSuccess: { backgroundColor: '#10b981', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', transition: 'background-color 0.2s' },
  };

  return (
    <div style={styles.container}>
      <button 
        onClick={() => navigate(-1)} 
        style={styles.btnOutline}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
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
          <div style={{ fontSize: '1.125rem', color: '#ffffff' }}>
            <strong>Учасників:</strong> {event.participantsCount || 0}
          </div>

          {event.isRegistered ? (
            <span style={{ color: '#10b981', fontWeight: '600', fontSize: '1.1rem' }}>✅ Ви вже записані</span>
          ) : (
            <button 
              onClick={handleRegister} 
              style={styles.btnSuccess}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              Записатися
            </button>
          )}
        </div>
      </div>
    </div>
  );
}