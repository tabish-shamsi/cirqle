# **Cirqle**

**A social media website built with modern web technologies.**

---

## **Tech Stack**

- **Frontend:** Next.js (App Router), Tailwind CSS, ShadCN
- **Backend / Database:** MongoDB, NextAuth
- **Other Tools:** ImageKit (for media storage), Nodemailer (email verification), Zod (validation), TypeScript

---

## **Features**

Cirqle includes social media core functionality:

- User Authentication (login, register, email verification)
- User Profiles `/u/[username]`
- Post creation and viewing `/p/[postId]`
- Stories `/stories/[username]`
- Friend system: requests, suggestions, sent requests
- Settings management: account info, email, password, socials
- Notifications system
- Real-time interactions: comments, likes, replies
- Image uploads handled via ImageKit
- Error, Loading, and 404 pages with custom UI

---

## **Environment Variables**

Create a `.env.local` file in the root of the project with:

```env
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
EMAIL=your_email_address
PASSWORD=your_email_password
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/your_database
```

> Make sure the database name is included in `MONGO_URI`.

---

## **Installation & Setup**

1. **Clone the repository**

```bash
git clone https://github.com/tabish-shamsi/cirqle.git
cd cirqle
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set environment variables** as shown above.

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

- Visit [http://localhost:3000](http://localhost:3000)

5. **Build for production**

```bash
npm run build
npm start
```

---

## **API Routes**

- `api/posts/[postId]/get-comments` → Fetch comments for a post
- `api/upload-auth` → Handle authenticated image uploads

---

## **Pages / Routes**

- **Home / Feed:** `/`
- **Posts:** `/p/[postId]`
- **Stories:** `/stories/[username]`
- **Profile:** `/u/[username]`
- **Friends:** `/friends`, `/friends/requests`, `/friends/suggestions`
- **Account:** `/account/login`, `/account/register`, `/account/verify`, `/account/change-password`
- **Settings:** `/settings`, `/settings/account-information`, `/settings/change-email`, `/settings/password`, `/settings/socials`
- **Error / Loading / NotFound:** `/error`, `/loading`, `/not-found`

---

## **Authentication & Access Control**

- NextAuth handles authentication
- Users **must verify email** to access main features
- `/account/verify` only accessible for unverified users
- Verified users cannot access `/account/login`, `/account/register`, `/account/verify`

---

## **Deployment**

Cirqle can be deployed on **Vercel** or any platform supporting Next.js:

1. Set all environment variables in the deployment dashboard.
2. Build and deploy the project.

---

## **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## **License**

MIT License
