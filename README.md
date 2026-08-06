# Hospital Management System (MediCare Advanced Hospital)

A modern, responsive Hospital Enquiry & Management Software built as a frontend-only web application using **React (Vite)**, **Tailwind CSS**, **React Router**, **Framer Motion**, and **React Icons**.

![Hospital Management System](https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80)

---

## 🌟 Features

- **Modern Healthcare UI/UX**: Designed with a professional color palette, dynamic animations, modern card layouts, and dark mode support.
- **Home Page**:
  - Hero section with hospital highlights and CTA buttons
  - Animated statistic counters (Doctors, Departments, Patients, Years of Experience)
  - Interactive services list & Why Choose Us features
  - Featured doctors & verified patient testimonials
  - Emergency contact banner, hospital gallery, and newsletter subscription
- **Departments Page**: Search and filter 10 specialized departments with detailed information modals.
- **Doctors Page**: Search & filter 20 doctor profiles by department, availability, rating, and experience.
- **Appointment Booking**: Validated booking form storing appointments to `LocalStorage` with a confirmation modal.
- **Enquiry Form**: Contact & enquiry form with validation and `LocalStorage` persistence.
- **About Us**: Hospital history, mission, vision, core values, achievements, and infrastructure.
- **Contact Page**: Hospital location, Google Maps placeholder, contact form, and FAQ accordion.
- **Admin Dashboard**: Live overview showing appointments, enquiries, doctor counts, department counts, and data management (delete records).
- **Floating Controls**: Cleanly stacked WhatsApp button, 24/7 Emergency Call button, and Scroll-to-Top button.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS v3
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Icons**: React Icons (FontAwesome, Feather, Material)
- **Data Persistence**: Browser LocalStorage

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/karthikReddyMalasani/Hospital-Management-System.git
   cd Hospital-Management-System
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
src/
 ├── assets/
 ├── components/
 │    ├── DoctorCard.jsx
 │    ├── DepartmentCard.jsx
 │    ├── Navbar.jsx
 │    ├── Footer.jsx
 │    └── ui.jsx
 ├── context/
 │    └── AppContext.jsx
 ├── data/
 │    ├── departments.js
 │    ├── doctors.js
 │    ├── faqs.js
 │    ├── hospital.js
 │    └── testimonials.js
 ├── hooks/
 │    ├── useCounter.js
 │    └── useLocalStorage.js
 ├── layouts/
 │    └── MainLayout.jsx
 ├── pages/
 │    ├── Home.jsx
 │    ├── Departments.jsx
 │    ├── Doctors.jsx
 │    ├── Appointment.jsx
 │    ├── Enquiry.jsx
 │    ├── About.jsx
 │    ├── Contact.jsx
 │    ├── Dashboard.jsx
 │    └── NotFound.jsx
 ├── App.jsx
 ├── index.css
 └── main.jsx
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
