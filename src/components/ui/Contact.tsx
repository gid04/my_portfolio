

const Contact = () => {
    return (
        <section id="contact" style={{ background: '#000', color: '#fff', padding: '6rem 0' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', opacity: 0.7 }}>Get In Touch</p>
                <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '3rem', lineHeight: 1.1 }}>
                    Let's work together.
                </h2>
                <a href="mailto:hello@example.com" style={{
                    fontSize: '1.5rem',
                    borderBottom: '1px solid #fff',
                    paddingBottom: '0.5rem',
                    display: 'inline-block',
                    marginBottom: '4rem'
                }}>
                    hello@gideondesign.com
                </a>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', opacity: 0.7 }}>
                    <a href="#">LinkedIn</a>
                    <a href="#">Behance</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>

                <div style={{ marginTop: '6rem', opacity: 0.3, fontSize: '0.9rem' }}>
                    © 2026 Gideon Chinonso AMOUSSOU-CHOUH. All rights reserved.
                </div>
            </div>
        </section>
    );
};

export default Contact;
