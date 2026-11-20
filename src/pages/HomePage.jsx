import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

export default function HomePage() {
  const { events } = useEvents();
  const recentEvents = events.slice(-3).reverse();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', paddingBottom: '6rem', position: 'relative' }}>
      
      {/* Hero Section */}
      <section style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center', 
        gap: '1.5rem', 
        paddingTop: '4rem',
        position: 'relative'
      }}>
        
        {/* Плашка сверху */}
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          backgroundColor: 'rgba(129, 140, 248, 0.1)', 
          color: 'var(--primary)', 
          padding: '0.4rem 1rem', 
          borderRadius: '100px', 
          fontSize: '0.85rem', 
          fontWeight: '600',
          border: '1px solid rgba(129, 140, 248, 0.2)'
        }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}></span>
          Нова ера організації подій
        </div>

        {/* Заголовок */}
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          fontWeight: '800', 
          lineHeight: '1.15', 
          letterSpacing: '-0.04em',
          maxWidth: '900px',
          color: '#ffffff'
        }}>
          Створюйте події, <br />
          які <span style={{ 
            background: 'linear-gradient(135deg, #818cf8 0%, #e879f9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>запам'ятовуються</span>
        </h1>

        <p style={{ 
          fontSize: '1.15rem', 
          color: 'var(--text-muted)', 
          maxWidth: '600px', 
          lineHeight: '1.6',
          margin: '0 auto'
        }}>
          Платформа для сучасних організаторів. Забудьте про таблиці та хаос. Запрошуйте учасників і керуйте розкладом в одному вікні.
        </p>

        {/* Кнопка */}
        <div style={{ marginTop: '1rem' }}>
          <Link 
            to="/events" 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#ffffff', 
              color: '#0f172a', 
              padding: '1rem 2.5rem', 
              borderRadius: '12px', 
              fontWeight: '600', 
              fontSize: '1.1rem', 
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)', 
              transition: 'all 0.3s ease' 
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.1)'; }}
          >
            Перейти до подій
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </Link>
        </div>
      </section>

      {/* Секция с реальными событиями */}
      <section style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#ffffff' }}>Останні події</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Нещодавно створені івенти</p>
          </div>
          {recentEvents.length > 0 && (
            <Link to="/events" style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.95rem' }}>
              Всі події →
            </Link>
          )}
        </div>

        {recentEvents.length === 0 ? (
          /* Заглушка для пустого списку */
          <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px dashed var(--border)' }}>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Тут поки що порожньо. Створіть свою першу подію в меню зверху!</p>
          </div>
        ) : (
          /* Рендер карточек */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {recentEvents.map((event) => (
              <Link 
                key={event.id} 
                to={`/events/${event.id}`} 
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div 
                  style={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.8)', // Темная карточка
                    borderRadius: '16px', 
                    padding: '1.5rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1rem',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.75rem', backgroundColor: 'rgba(129, 140, 248, 0.1)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontWeight: '600' }}>{event.category}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', margin: 0, lineHeight: '1.4' }}>{event.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ opacity: 0.7 }}>📅</span> {event.date}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ opacity: 0.7 }}>📍</span> {event.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}