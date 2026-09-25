"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ContactModal.module.css";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    contact: "",
    propertyValue: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus first input
      setTimeout(() => firstInputRef.current?.focus(), 200);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.contact.trim())
      newErrors.contact = "Email or phone is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    // Placeholder — connect to backend/CRM later
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Get in touch"
    >
      <div ref={modalRef} className={styles.modal}>
        <button
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line
              x1="4"
              y1="4"
              x2="16"
              y2="16"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <line
              x1="16"
              y1="4"
              x2="4"
              y2="16"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>

        {submitted ? (
          <div className={styles.successState}>
            <h3 className={styles.successTitle}>Thank you.</h3>
            <p className={styles.successText}>
              We&apos;ll be in touch within 24 hours.
            </p>
            <button onClick={onClose} className={`btn btn--ghost ${styles.doneBtn}`}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Get in touch</h3>
              <p className={styles.modalDesc}>
                Tell us about your property and we&apos;ll show you
                what&apos;s possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-name" className={styles.label}>
                  Name
                </label>
                <input
                  ref={firstInputRef}
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.name ? styles.inputError : ""
                  }`}
                  placeholder="Your name"
                  autoComplete="name"
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="contact-company" className={styles.label}>
                  Company
                </label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.company ? styles.inputError : ""
                  }`}
                  placeholder="Your company"
                  autoComplete="organization"
                />
                {errors.company && (
                  <span className={styles.error}>{errors.company}</span>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="contact-email" className={styles.label}>
                  Email or Phone
                </label>
                <input
                  id="contact-email"
                  name="contact"
                  type="text"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.contact ? styles.inputError : ""
                  }`}
                  placeholder="How can we reach you?"
                  autoComplete="email"
                />
                {errors.contact && (
                  <span className={styles.error}>{errors.contact}</span>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="contact-value" className={styles.label}>
                  Property Value Range
                </label>
                <select
                  id="contact-value"
                  name="propertyValue"
                  value={formData.propertyValue}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Select range</option>
                  <option value="1-2m">$1M – $2M</option>
                  <option value="2-5m">$2M – $5M</option>
                  <option value="5-10m">$5M – $10M</option>
                  <option value="10m+">$10M+</option>
                  <option value="portfolio">Portfolio / Multiple</option>
                </select>
              </div>

              <button
                type="submit"
                className={`btn btn--primary ${styles.submitBtn}`}
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
