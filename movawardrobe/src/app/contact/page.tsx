'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: hook this up to Formspree, Resend, or similar
    setSent(true)
  }

  return (
    <div className="contact-page">
      <div>
        <h1 className="contact-title">Get in touch</h1>
        <p className="contact-sub">
          Questions about an order, a product, or just want to say hello? We read every message and respond within 24 hours.
        </p>
        <div className="contact-info">
          <div>
            <p className="contact-info-item-label">Email</p>
            <p className="contact-info-item-val">hello@movawardrobe.com</p>
          </div>
          <div>
            <p className="contact-info-item-label">Hours</p>
            <p className="contact-info-item-val">Mon – Fri, 9am – 6pm</p>
          </div>
          <div>
            <p className="contact-info-item-label">Returns</p>
            <p className="contact-info-item-val">30-day free returns</p>
          </div>
        </div>
      </div>

      <div>
        {sent ? (
          <div style={{ padding: '48px 0' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 28, letterSpacing: '-0.02em', marginBottom: 12 }}>
              Message sent.
            </p>
            <p style={{ fontSize: 14, color: '#8a8a8a' }}>
              We'll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-label">Name</label>
              <input
                className="form-input"
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your name"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com"
              />
            </div>
            <div className="form-field">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                required
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="How can we help?"
              />
            </div>
            <button type="submit" className="btn-submit">Send Message →</button>
          </form>
        )}
      </div>
    </div>
  )
}
