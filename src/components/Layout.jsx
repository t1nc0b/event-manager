import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <header style={{ padding: '1rem', background: '#eee', display: 'flex', gap: '1rem' }}>
        <strong>Event Manager</strong>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/">Головна</Link>
          <Link to="/events">Події</Link>
          <Link to="/events/new">Створити</Link>
        </nav>
      </header>
      
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
      
      <footer style={{ padding: '1rem', background: '#eee', textAlign: 'center' }}>
        © 2024 Event Manager
      </footer>
    </div>
  );
}