import React from 'react';

function Hero() {
    return (
        <div style={{
            background: '#f3f3f3',
            minHeight: '280px',
            padding: '30px 28px 0',
            boxSizing: 'border-box',
            color: '#424242'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px'
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: '2.5rem',
                    fontWeight: 500,
                    color: '#404040'
                }}>Support Portal</h1>

                <button
                    type="button"
                    style={{
                        border: 'none',
                        background: '#1e7ad9',
                        color: '#fff',
                        fontSize: '1rem',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        boxShadow: 'none',
                        minWidth: '150px'
                    }}
                >
                    My tickets
                </button>
            </div>

            <div style={{
                maxWidth: '1400px',
                margin: '30px auto 0',
                paddingTop: '32px'
            }}>
                <form
                    action=""
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        width: 'auto',
                        border: '1px solid #d3d3d3',
                        borderRadius: '6px',
                        background: '#f8f8f8',
                        padding: '10px 10px 10px 15px',
                        boxSizing: 'border-box'
                    }}
                >
                    <i className="fa-solid fa-magnifying-glass" style={{
                        color: '#7d7d7d',
                        fontSize: '1.1rem'
                    }}></i>
                    <input
                        type="text"
                        placeholder="Eg: How do I open my account, How do i activate F&O..."
                        style={{
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            width: '100%',
                            color: '#444',
                            fontSize: '1.15rem',
                            fontWeight: 400,
                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                        }}
                    />
                </form>
            </div>
        </div>
    );
}

export default Hero;