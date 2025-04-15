# Vino Rodante - Project Completion Steps

This document outlines the remaining tasks to complete the Vino Rodante project.

## 1. Backend & Data Setup (Supabase)

-   [ ] **Configure Supabase:**
    -   [ ] Create a Supabase project.
    -   [ ] Define database tables (e.g., `products`, `orders`, `users` if needed).
    -   [ ] Obtain API URL and keys.
-   [ ] **Setup Environment Variables:**
    -   [ ] Create/update `.env.local` with Supabase URL and keys.
    -   [ ] Ensure these variables are also set in Vercel deployment settings.
-   [ ] **Re-enable Supabase Client:**
    -   [ ] Uncomment and configure `lib/supabase.ts`.
    -   [ ] Install `@supabase/supabase-js` if not already done (`npm install @supabase/supabase-js`).

## 2. Product Management

-   [ ] **API Route (Public):**
    -   [ ] Implement `app/api/products/route.ts` (GET method) to fetch product data from Supabase.
-   [ ] **Frontend Display:**
    -   [ ] Update `app/page.tsx` (`#explorar` section) to fetch products using the API route.
    -   [ ] Replace placeholder product cards with dynamic data and real images.
    -   [ ] Ensure "Add to Cart" functionality works with real product data.
-   [ ] **Admin - Product Management Page:**
    -   [ ] Create `app/admin/products/page.tsx` component.
    -   [ ] Implement UI for displaying, adding, editing, and deleting products.
    -   [ ] Protect this page using `AdminProtected`.
-   [ ] **API Routes (Admin):**
    -   [ ] Implement `app/api/admin/products/route.ts` (POST for adding).
    -   [ ] Implement `app/api/admin/products/[id]/route.ts` (PUT for updating, DELETE for removing).
    -   [ ] Connect these admin API routes to Supabase CRUD operations.
    -   [ ] Secure these API routes (ensure only authenticated admin can access).

## 3. Order Processing & Checkout

-   [ ] **API Route (Orders):**
    -   [ ] Implement `app/api/orders/route.ts` (POST method) to save verified order details to Supabase.
-   [ ] **Checkout Flow:**
    -   [ ] Integrate MercadoPago SDK/API into `app/checkout/page.tsx`.
    -   [ ] Handle payment initiation and callbacks (success/failure).
    -   [ ] On successful payment confirmation, call the `/api/orders` POST route to save the order.
-   [ ] **Admin - Order Viewing:**
    -   [ ] Implement `app/api/admin/orders/route.ts` (GET method) to fetch all orders from Supabase for the admin.
    -   [ ] Update `app/admin/orders/page.tsx` to fetch and display orders from this working API route.
    -   [ ] (Optional) Implement order status updates (API route + Admin UI).

## 4. Email Notifications

-   [ ] **Setup Email Provider:**
    -   [ ] Choose a provider (e.g., Resend, SendGrid).
    -   [ ] Obtain API keys and configure environment variables (local and Vercel).
-   [ ] **Implement Email API:**
    -   [ ] Re-enable and implement `app/api/send-order/route.ts` using the chosen provider's SDK.
    -   [ ] Ensure it accepts order details and sends a confirmation email.
    -   [ ] Remove/update the temporary placeholder response.
-   [ ] **Trigger Email:**
    -   [ ] Call the `/api/send-order` route after successfully saving an order in the `/api/orders` route.

## 5. Content Pages & UI Refinements

-   [ ] **Develop Content Pages:**
    -   [ ] Create content and layout for `/clubes`.
    -   [ ] Enhance content and layout for `/nosotros`.
    -   [ ] Create content and layout for `/contacto` (add form functionality if required).
-   [ ] **UI/UX Review:**
    -   [ ] Review overall site styling and consistency.
    -   [ ] Check and refine responsiveness on different screen sizes.
    -   [ ] Ensure smooth navigation and user flow.

## 6. Admin Authentication

-   [ ] **Review Current Method:**
    -   [ ] Verify the `sessionStorage` method is working reliably after other API fixes.
    -   [ ] Consider if a more robust solution (like NextAuth.js) is needed for future scalability (optional for now if `sessionStorage` suffices).

## 7. Testing

-   [ ] **Frontend Testing:**
    -   [ ] Test adding various products to the cart.
    -   [ ] Test updating quantities and removing items from the cart sidebar.
    -   [ ] Test the full checkout flow with MercadoPago integration (use test credentials).
    -   [ ] Test navigation between pages and sections.
    -   [ ] Test responsiveness thoroughly.
-   [ ] **Admin Panel Testing:**
    -   [ ] Test admin login/logout.
    -   [ ] Test viewing orders.
    -   [ ] Test product CRUD operations (if implemented).
-   [ ] **API Testing:**
    -   [ ] Test all implemented API routes directly (e.g., using Postman or similar tools).
-   [ ] **Email Testing:**
    -   [ ] Verify order confirmation emails are sent correctly.

## 8. Final Deployment

-   [ ] **Environment Variables:**
    -   [ ] Double-check all required environment variables (Supabase, Email Provider, MercadoPago) are set in Vercel.
-   [ ] **Build & Deploy:**
    -   [ ] Run `npm run build` locally to catch any production build errors.
    -   [ ] Push final changes to trigger Vercel deployment.
    -   [ ] Monitor deployment logs on Vercel.
-   [ ] **Post-Deployment Check:**
    -   [ ] Test core functionality on the live production URL. 