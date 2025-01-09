# iWitness: Empowering Communities Through Secure and Anonymous Crime Reporting

iWitness is a revolutionary crime and incident reporting application designed to empower individuals and communities by providing a secure platform for reporting incidents, accessing safety resources, and fostering awareness. Built with cutting-edge technologies, iWitness ensures seamless functionality, robust data security, and an intuitive user experience.

---

## 🚀 Features

- **Secure Crime Reporting**: Report incidents anonymously or with your credentials. 
- **AI Integration with GeminiAI**: Enhance user experience with intelligent suggestions and analysis.
- **Safety Resources**: Access curated articles, guides, and official links to improve personal and cyber safety.
- **Emergency Support**: One-click emergency dialer to quickly contact authorities.
- **User Authentication**: Robust authentication using NextAuth.js with secure password encryption.
- **Report Tracking**: Track the status of your submitted reports with ease and transparency.
- **Admin Bashboard**: Dedicated tools for administrators to manage reports, users, and system configurations efficiently.
- **Responsive Design**: Tailored for mobile and desktop users with Tailwind CSS.

---

## 🛠️ Technologies Used

### Framework and Language
- **[Next.js 14](https://nextjs.org/)**: Powerful React framework for server-side rendering and building scalable web applications.
- **[TypeScript](https://www.typescriptlang.org/)**: For a type-safe and maintainable codebase.

### Database and ORM
- **[Prisma](https://www.prisma.io/)**: Modern ORM integrated with **[Neon Database](https://neon.tech/)** for reliable and scalable data management.

### Authentication
- **[NextAuth.js](https://next-auth.js.org/)**: Seamless user authentication with customizable providers.

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for efficient styling.

### Form Handling
- **[React Hook Form](https://react-hook-form.com/)**: Simplified and performant form management.

### Security
- **[BCrypt](https://github.com/kelektiv/node.bcrypt.js)**: Encrypts user passwords for enhanced security.

---

## 📦 Installation and Setup

### Prerequisites
- **Node.js** (v18 or above)
- **npm** or **yarn** package manager
- **Neon Database** connection string

### Steps to Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/iwitness.git
   cd iwitness
   
2. Install dependencies:
npm install

3. Configure environment variables: Create a .env file in the root directory with the following variables:

DATABASE_URL=your-neon-database-url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

4. Run Prisma migrations:

npx prisma migrate dev

5. Start the development server:
   
npm run dev



