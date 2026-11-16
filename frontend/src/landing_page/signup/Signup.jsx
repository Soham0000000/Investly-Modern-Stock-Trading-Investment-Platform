import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [searchParams] = useSearchParams();
    const [isLogin, setIsLogin] = useState(searchParams.get('mode') === 'login');
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsLogin(searchParams.get('mode') === 'login');
        setError('');
        setSuccess('');
    }, [searchParams]);

    const updateForm = (event) => {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3802';
            const response = await fetch(`${apiUrl}/auth/${isLogin ? 'login' : 'register'}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const result = await response.json();

            if (!response.ok) throw new Error(result.message || 'Unable to continue. Please try again.');

            if (!isLogin) {
                setForm((current) => ({ ...current, name: '', password: '' }));
                setIsLogin(true);
                setSuccess('Your account has been created. Sign in with your new credentials to continue.');
                return;
            }

            const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || 'http://localhost:5176';
            window.location.assign(dashboardUrl);
        } catch (requestError) {
            setError(requestError.message || 'Unable to connect to the server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="auth-page">
            <section className="auth-panel">
                <div className="auth-copy">
                    <p className="auth-eyebrow">YOUR MONEY, IN FOCUS</p>
                    <h1>{isLogin ? 'Welcome back.' : 'Make room for better investing.'}</h1>
                    <p>{isLogin ? 'Sign in to pick up where you left off.' : 'Create your account to explore the Investly trading dashboard.'}</p>
                    <div className="auth-market-note"><span /> Demo markets are open</div>
                </div>

                <div className="auth-form-wrap">
                    <div className="auth-form-heading">
                        <p className="auth-eyebrow">ACCOUNT ACCESS</p>
                        <h2>{isLogin ? 'Sign in' : 'Create your account'}</h2>
                        <p>{isLogin ? 'Enter your account details below.' : 'A few details and you are ready to go.'}</p>
                    </div>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <label>
                                Full name
                                <input name="name" type="text" autoComplete="name" minLength="2" maxLength="80" value={form.name} onChange={updateForm} required />
                            </label>
                        )}
                        <label>
                            Email address
                            <input name="email" type="email" autoComplete="email" maxLength="254" value={form.email} onChange={updateForm} required />
                        </label>
                        <label>
                            Password
                                <input name="password" type="password" autoComplete={isLogin ? 'current-password' : 'new-password'} minLength="8" maxLength="72" value={form.password} onChange={updateForm} required />
                            {!isLogin && <span className="auth-help">Use at least 8 characters.</span>}
                        </label>
                        {error && <p className="auth-error" role="alert">{error}</p>}
                        {success && <p className="auth-success" role="status">{success}</p>}
                        <button className="auth-submit" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Please wait...' : isLogin ? 'Sign in' : 'Create account'}
                            <span aria-hidden="true">→</span>
                        </button>
                    </form>
                    <p className="auth-switch">
                        {isLogin ? 'New to Investly?' : 'Already have an account?'}{' '}
                        <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                            {isLogin ? 'Create account' : 'Sign in'}
                        </button>
                    </p>
                    <Link className="auth-back" to="/">Back to home</Link>
                </div>
            </section>
        </main>
    );
}

export default Signup;