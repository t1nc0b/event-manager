import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Manrope, sans-serif' }}>
      
      {/* Плавающая шапка */}
      <div style={{ padding: '1.5rem 1rem' }}>
        <header style={{
          maxWidth: '1000px',
          margin: '0 auto',
          backgroundColor: 'rgba(30, 41, 59, 0.7)', // Темное стекло
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '100px',
          padding: '0.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
          position: 'sticky',
          top: '1.5rem',
          zIndex: 50
        }}>
          <Link to="/" style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
            Event<span style={{ color: 'var(--primary)' }}>Manager</span>
          </Link>
          
          <nav style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', fontWeight: '600', padding: '0.5rem 1rem', borderRadius: '100px', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
              Головна
            </Link>
            <Link to="/events" style={{ color: 'var(--text-muted)', fontWeight: '600', padding: '0.5rem 1rem', borderRadius: '100px', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
              Події
            </Link>
            <Link to="/events/new" style={{ backgroundColor: 'var(--primary)', color: '#ffffff', fontWeight: '600', padding: '0.5rem 1.25rem', borderRadius: '100px', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}>
              Створити
            </Link>
          </nav>
        </header>
      </div>

      {/* Основной контент */}
      <main style={{ flex: 1, padding: '2rem 1rem', maxWidth: '1000px', width: '100%', margin: '0 auto', position: 'relative' }}>
        <Outlet />
      </main>
      
      {/* Футер */}
      <footer style={{
        padding: '2rem 1rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.875rem',
        borderTop: '1px solid var(--border)',
        marginTop: 'auto'
      }}>
        © 2024 Event Manager. Створено з React.
      </footer>
    </div>
  );
}