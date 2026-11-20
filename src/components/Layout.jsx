import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Шапка */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }}>
        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: '700', color: '#4f46e5', textDecoration: 'none' }}>
          Event Manager
        </Link>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/" style={{ color: '#111827', fontWeight: '500', textDecoration: 'none' }}>Головна</Link>
          <Link to="/events" style={{ color: '#111827', fontWeight: '500', textDecoration: 'none' }}>Події</Link>
          <Link to="/events/new" style={{ color: '#111827', fontWeight: '500', textDecoration: 'none' }}>Створити</Link>
        </nav>
      </header>
      
      {/* Основной контент */}
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
        <Outlet />
      </main>
      
      {/* Футер */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        padding: '1rem',
        textAlign: 'center',
        color: '#6b7280',
        fontSize: '0.875rem'
      }}>
        © 2024 Event Manager. Всі права захищені.
      </footer>
    </div>
  );
}