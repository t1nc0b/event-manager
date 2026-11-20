import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';

export default function CreateEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    category: 'Конференція',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Назва обов’язкова';
    if (!formData.date) newErrors.date = 'Дата обов’язкова';
    if (!formData.location.trim()) newErrors.location = 'Місце обов’язкове';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    addEvent(formData);
    setFormData({ title: '', date: '', location: '', category: 'Конференція', description: '' });
    navigate('/events');
  };

  const styles = {
    container: { maxWidth: '600px', margin: '0 auto' },
    // Заголовок теперь белый
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1.5rem', textAlign: 'center' },
    // Форма белая, но с легкой тенью, чтобы выделялась
    formCard: { backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '1rem' },
    label: { fontSize: '0.875rem', fontWeight: '500', color: '#111827' },
    input: { width: '100%', padding: '0.625rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', backgroundColor: '#f9fafb' },
    inputError: { borderColor: '#ef4444' },
    errorText: { color: '#ef4444', fontSize: '0.75rem' },
    btnPrimary: { backgroundColor: '#4f46e5', color: 'white', padding: '0.8rem 1rem', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer', width: '100%', marginTop: '1rem', fontSize: '1rem', transition: 'background-color 0.2s' },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Створення події</h1>
      <form onSubmit={handleSubmit} style={styles.formCard}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Назва події *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Наприклад: Конференція React"
            style={{ ...styles.input, ...(errors.title ? styles.inputError : {}) }}
          />
          {errors.title && <span style={styles.errorText}>{errors.title}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Дата *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{ ...styles.input, ...(errors.date ? styles.inputError : {}) }}
          />
          {errors.date && <span style={styles.errorText}>{errors.date}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Місце *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Наприклад: Київ, вул. Хрещатик"
            style={{ ...styles.input, ...(errors.location ? styles.inputError : {}) }}
          />
          {errors.location && <span style={styles.errorText}>{errors.location}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Категорія</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Конференція">Конференція</option>
            <option value="Воркшоп">Воркшоп</option>
            <option value="Мітап">Мітап</option>
            <option value="Вечірка">Вечірка</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Опис</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Короткий опис події..."
            style={styles.input}
          />
        </div>

        <button 
          type="submit" 
          style={styles.btnPrimary} 
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338ca'} 
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
        >
          Створити подію
        </button>
      </form>
    </div>
  );
}