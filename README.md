# A Simple Vok App using nextjs Api Routes V2

# From Users Perspective

User goes to the homepage:

- User sees a list of vocabularies
- to add one user can sign in or sign up
- once signed in the user can create a new vocabulary or edit an old one (the vocabulary must be from the user)
- User can go to his profile an see his created vocabularies

# Admin

- ~~Admin can CRUD all vocabularies~~
- ~~Admin can CRUD all Users~~

# Tech Stack behind

- Next js
- typescript
- axios
- nprogress
- moment/ react-moment
- Styled-components
- React Context
- SWR
- react-hook-forms
- MongoDB / mongoose
- NextAuth.js
- Vercel

# Milestones

1. Start a new Next js App using typescript✅
   - create tsconfig.json ✅
   - add baseUrl and no relative paths✅
   - create relevant pages✅
     - /
     - /create
     - /v/:slug
     - /profile
2. Add MongoDB Atlas (backendish)
   - initialize a new Mongo DB✅
   - connect it to the App✅
   - create a new Vok Schema with mongoose✅
   - create API Route to read and create voks✅
     - /api/voks
   - create API Route to read vok by ID, delete and update vok✅
     - /api/voks/[id]
3. Style the pages using Styled Components
   - initialize Styled Components✅
   - Create a Layout with Navigation to navigate through pages✅
   - use nprogress✅
   - Mobile Responsive✅
4. Create Components from the frontend to call these functions
   - fetch users voks on the homepage (useSWR)✅
   - use react-hook-forms for creating new voks✅
   - create Icons to delete and update
   - use react-hook-forms for updating an old vok => get voks data in form
5. Add support for user auth with auth0✅
   - create a auth0 app as auth system✅
   - redirect unlogged user to homepage✅
   - if logged in show user profile page with made voks✅
6. User can comment other vocabularies/ Rate other vocabularies based on difficulty
7. User can mark them as favorite
8. User can search for vocabularies ~~and filter~~
9. Do some SEO Stuffs and 404 page
10. Lauch on Vercel
    - add db into next.config.js
    - deploy app
    - add env variables to vercel
