# Benimaru

I have made a simple E-Commerce website to practice Next.js and React.

- [Next.js 14](https://nextjs.org/)
- [NextAuth.js 5 beta](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Preparation

Create accounts and generate API Keys

- [Resend](https://resend.com/) : Email Verification, Password Reset
- [Google OAuth](https://console.cloud.google.com/apis/dashboard) : Google Login
- [Supabase](https://supabase.com/) : Database (Postgresql)

Create .env file

```bash
$ copy .env.example .env
```

Update env file (setting API Keys, URL and Domain info)

If you just want to run demo, only need to update the list below in env file

- Google OAuth Client Id and Secret

  - GOOGLE_CLIENT_ID
  - GOOGLE_CLIENT_SECRET

- Supabase DB Connection URI

  - DATABASE_URL
  - DIRECT_URL

- Resend API Key

  - RESEND_API_KEY

## Getting Started

First, generate demo files:

```bash
$ npm run demo
```

Second, run the development server:

```bash
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Screenshots

### Desktop Home

![Desktop Home](/screenshot/desktop_home.png)

### Mobile Home

![Mobile Home](/screenshot/mobile_home.png)

### Shopping Cart

![Shopping Cart](/screenshot/shopping_cart.png)

### Desktop Category Menu

![Desktop Category Menu](/screenshot/desktop_category_menu.png)

### Mobile Category Menu

![Mobile Category Menu](/screenshot/mobile_category_menu.png)

### Product Detail

![Product Detail](/screenshot/product_detail.png)

### Product list by Category

![Product list by Category](/screenshot/product_list_by_category.png)

## References

### Auth

- [Next Auth V5 - Advanced Guide (2024)](https://www.youtube.com/watch?v=1MTyCvS05V4)

### Design

- [Nike](https://www.nike.com/)
- [Chanel](https://www.chanel.com/)
- [Next.js 14 E-Commerce Website with Stripe, and Sanity.io](https://www.youtube.com/watch?v=UnwmPuPdhFc)

### Demo Photos

Slide photos

- Photo by <a href="https://unsplash.com/@anotherlovely?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Alyssa Strohmann</a> on <a href="https://unsplash.com/photos/hanged-top-on-brown-and-white-clothes-horse-TS--uNw-JqE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

- Photo by <a href="https://unsplash.com/@stereophototyp?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sara Kurfeß</a> on <a href="https://unsplash.com/photos/shallow-focus-photo-of-mannequin-wearing-brown-sunhat-5epnzwsphl0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

- Photo by <a href="https://unsplash.com/@jsnbrsc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jason Briscoe</a> on <a href="https://unsplash.com/photos/assorted-color-towels-hanging-inside-room-w2uvoJo_woE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

- Photo by <a href="https://unsplash.com/@bluemagnet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Dusabimana Aimable</a> on <a href="https://unsplash.com/photos/black-and-white-tribal-long-sleeve-shirt-TfCe6TxInCw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

- Photo by <a href="https://unsplash.com/@angelabaileyy?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Angela Bailey</a> on <a href="https://unsplash.com/photos/orange-knit-cap-jlo7Bf4tUoY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

Product photos

- Photo by <a href="https://unsplash.com/@mohammadsalman?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Md Salman</a> on <a href="https://unsplash.com/photos/assorted-color-folded-shirts-on-wooden-panel-tWOz2_EK5EQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

- Photo by <a href="https://unsplash.com/@sarahdorweiler?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sarah Dorweiler</a> on <a href="https://unsplash.com/photos/white-crew-neck-t-shirt-and-brown-leather-boots-gUPiTDBdRe4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

- Photo by <a href="https://unsplash.com/@nimblemade?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Nimble Made</a> on <a href="https://unsplash.com/photos/white-and-black-polka-dot-textile-NS2BZsGxOLE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

- Photo by <a href="https://unsplash.com/@frankflores?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Frank Flores</a> on <a href="https://unsplash.com/photos/closeup-photo-of-person-hiding-his-right-hand-in-his-pocket-eyFcZLLYvfA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

- Photo by <a href="https://unsplash.com/@mediamodifier?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mediamodifier</a> on <a href="https://unsplash.com/photos/white-zip-up-jacket-hanging-on-brown-wooden-clothes-hanger-kJXGTOY1wLQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## License

Licensed under the
[MIT](https://github.com/kimfame/benimaru/blob/main/LICENSE) License.
