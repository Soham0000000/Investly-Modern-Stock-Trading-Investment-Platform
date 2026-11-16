import React from 'react';

const faqItems = [
    {
        label: 'Account Opening',
        icon: '+',
        items: ['Resident individual', 'Minor', 'Non Resident Indian (NRI)', 'Company, Partnership, HUF and LLP', 'Glossary']
    },
    {
        label: 'Your Investly Account',
        icon: '◌',
        items: ['Your Profile', 'Account modification', 'Client Master Report (CMR) and Depository Participant (DP)', 'Nomination', 'Transfer and conversion of securities']
    },
    {
        label: 'Kite',
        icon: '↗',
        items: ['IPO', 'Trading FAQs', 'Margin Trading Facility (MTF) and Margins', 'Charts and orders', 'Alerts and Nudges', 'General']
    },
    {
        label: 'Funds',
        icon: '₹',
        items: ['Add money', 'Withdraw money', 'Add bank accounts', 'eMandates']
    },
    {
        label: 'Console',
        icon: '@',
        items: ['Portfolio', 'Corporate actions', 'Funds statement', 'Reports', 'Profile', 'Segments']
    },
    {
        label: 'Coin',
        icon: '◌',
        items: ['Mutual funds', 'National Pension Scheme (NPS)', 'Fixed Deposit (FD)', 'Features on Coin', 'Payments and Orders', 'General']
    }
];

const quickLinks = [
    'Track account opening',
    'Track segment activation',
    'Intraday margins',
    'Kite user manual',
    'Learn how to create a ticket'
];

const issues = [
    '[Resolved] Issue with price updates from BSE',
    'Latest Intraday leverages and Square-off timings'
];

function CreateTicket() {
    const [openItem, setOpenItem] = React.useState('Account Opening');

    const toggleOpen = (label) => {
        setOpenItem((current) => (current === label ? '' : label));
    };

    return (
        <div style={{
            padding: '50px 0 50px',
            boxSizing: 'border-box',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        }}>
            <div style={{
                maxWidth: '1380px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: '1.95fr 0.92fr',
                gap: '28px',
                padding: '0 22px'
            }}>
                <div>
                    {faqItems.map((item, index) => {
                        const isOpen = openItem === item.label;

                        return (
                            <div
                                key={item.label}
                                style={{
                                    border: '1px solid #d8dfe6',
                                    borderRadius: '8px',
                                    background: isOpen ? '#f7fbff' : '#f6f8f9',
                                    marginBottom: '10px',
                                    boxSizing: 'border-box',
                                    overflow: 'hidden'
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleOpen(item.label)}
                                    style={{
                                        width: '100%',
                                        border: 'none',
                                        background: 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        minHeight: '78px',
                                        padding: '0 18px 0 14px',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        fontFamily: 'inherit'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            border: '2px solid #1f7ad8',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#1f7ad8',
                                            fontSize: '1.1rem',
                                            fontWeight: 600,
                                            background: '#f4f9ff',
                                            flexShrink: 0
                                        }}>
                                            {item.icon}
                                        </div>
                                        <span style={{
                                            fontSize: '1.04rem',
                                            fontWeight: 500,
                                            color: '#2f3133',
                                            letterSpacing: '-0.01em'
                                        }}>
                                            {item.label}
                                        </span>
                                    </div>

                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        borderLeft: '2px solid #1f7ad8',
                                        borderBottom: '2px solid #1f7ad8',
                                        transform: isOpen ? 'rotate(135deg)' : 'rotate(-45deg)',
                                        marginRight: '8px',
                                        transition: 'transform 0.2s ease',
                                        opacity: 0.9
                                    }} />
                                </button>

                                {isOpen && (
                                    <div style={{
                                        padding: '0 0 18px 0',
                                        borderTop: '1px solid #d8dfe6',
                                        background: '#f7fbff'
                                    }}>
                                        <ul style={{
                                            listStyle: 'none',
                                            margin: 0,
                                            padding: '24px 0 0 46px'
                                        }}>
                                            {item.items.map((subItem) => (
                                                <li key={subItem} style={{
                                                    position: 'relative',
                                                    marginBottom: '22px',
                                                    paddingLeft: '14px',
                                                    fontSize: '1.1rem',
                                                    color: '#1f7ad8',
                                                    lineHeight: '1.4',
                                                    fontWeight: 400
                                                }}>
                                                    <span style={{
                                                        position: 'absolute',
                                                        left: '0',
                                                        top: '10px',
                                                        width: '7px',
                                                        height: '7px',
                                                        background: '#2d2d2d',
                                                        borderRadius: '50%',
                                                        transform: 'translate(-50%, -50%)'
                                                    }} />
                                                    {subItem}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div>
                    <div style={{
                        background: '#f1e3d2',
                        border: '1px solid #e9dab8',
                        borderRadius: '0',
                        padding: '20px 18px 10px 20px',
                        minHeight: '180px',
                        boxSizing: 'border-box',
                        color: '#2b2b2b'
                    }}>
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            {issues.map((issue) => (
                                <li key={issue} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '10px',
                                    marginBottom: '20px',
                                    lineHeight: '1.45',
                                    fontSize: '1.05rem',
                                    fontWeight: 500,
                                    color: '#2d2d2d'
                                }}>
                                    <span style={{
                                        color: '#1e7ad9',
                                        fontSize: '1.2rem',
                                        lineHeight: 1.2,
                                        marginTop: '2px'
                                    }}>•</span>
                                    <span><a href="">{issue}</a></span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{
                        marginTop: '26px',
                        background: '#e8e8e8',
                        border: '1px solid #d9d9d9',
                        borderRadius: '0',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            background: '#e1e1e1',
                            color: '#3a3a3a',
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            padding: '14px 16px',
                            borderBottom: '1px solid #d0d0d0'
                        }}>
                            Quick links
                        </div>

                        <div>
                            {quickLinks.map((link, index) => (
                                <div
                                    key={link}
                                    style={{
                                        padding: '18px 16px',
                                        borderBottom: index === quickLinks.length - 1 ? 'none' : '1px solid #d2d2d2',
                                        fontSize: '1.04rem',
                                        color: '#2f2f2f',
                                        background: '#f2f2f2'
                                    }}
                                >
                                    
                                    <a href="" style={{textDecoration:"none"}}>{index + 1}. {link}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;