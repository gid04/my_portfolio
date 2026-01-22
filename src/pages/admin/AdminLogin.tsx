import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple client-side check. In a real app, this would be server-side.
        if (pin === '2026') {
            sessionStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Incorrect PIN');
        }
    };

    return (
        <div className="container" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>
            <h1 style={{ marginBottom: '2rem' }}>Admin Access</h1>
            <form onSubmit={handleLogin} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '100%',
                maxWidth: '300px'
            }}>
                <input
                    type="password"
                    placeholder="Enter PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-color)',
                        fontSize: '1.2rem',
                        textAlign: 'center'
                    }}
                    autoFocus
                />
                <button type="submit" className="btn-primary" style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    background: 'var(--text-color)',
                    color: 'var(--bg-color)',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>
                    Unlock
                </button>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            </form>
        </div>
    );
};

export default AdminLogin;
