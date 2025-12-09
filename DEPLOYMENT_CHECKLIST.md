# Deployment Checklist ✅

## Pre-Deployment Checks

### 1. Environment Variables

Ensure all required environment variables are set in your deployment platform:

```bash
# Required
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_min_32_chars
NEXTAUTH_SECRET=your_nextauth_secret
SESSION_SECRET=your_session_secret

# Email (Resend)
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=noreply@payzeker.com  # Must be verified domain

# App URL (Update for production)
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Paystack
PAYSTACK_SECRET_KEY=sk_live_your_key  # Use live key for production
NEXT_PUBLIC_PAYSTACK_KEY=pk_live_your_key

# Optional
REDIS_URL=redis://your_redis_url
GOOGLE_DRIVE_FOLDER_ID=your_folder_id
GOOGLE_DRIVE_CREDENTIALS=your_credentials_json
```

### 2. Email Configuration

- ✅ Verify domain in Resend dashboard (https://resend.com/domains)
- ✅ Add DNS records (SPF, DKIM, DMARC)
- ✅ Test email sending with production domain
- ✅ Update `RESEND_FROM_EMAIL` to match verified domain

### 3. Database

- ✅ Use production MongoDB connection string
- ✅ Ensure database has proper indexes
- ✅ Test database connectivity
- ✅ Backup existing data

### 4. Security

- ✅ All secrets are strong (min 32 characters)
- ✅ No sensitive data in git repository
- ✅ `.env.local` is in `.gitignore`
- ✅ CORS settings are configured properly
- ✅ Rate limiting is enabled (if applicable)

### 5. Build & Compilation

Run these commands locally to check for errors:

```bash
# Type checking
npm run build

# Linting
npm run lint
```

### 6. Code Quality

- ✅ No TypeScript errors
- ✅ No ESLint errors
- ✅ All imports are resolved
- ✅ Unused variables removed
- ✅ Console logs are for error tracking only

## Deployment Platform Specific

### Vercel

1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy from main/master branch
4. Check deployment logs for errors

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Set environment variables
4. Enable Next.js runtime

### Railway/Render

1. Set Node version: `20.x`
2. Build command: `npm run build`
3. Start command: `npm start`
4. Set environment variables

## Post-Deployment Checks

### 1. Functionality Tests

- ✅ User registration works
- ✅ User login works
- ✅ Forgot password flow works
- ✅ Email sending works (check inbox & spam)
- ✅ Password reset works
- ✅ Dashboard loads correctly
- ✅ All protected routes require authentication

### 2. Email Flow Tests

1. Go to `/forget`
2. Enter registered email
3. Check email inbox (and spam folder)
4. Click reset link
5. Reset password successfully
6. Login with new password

### 3. Performance

- ✅ Pages load within 3 seconds
- ✅ Images are optimized
- ✅ No console errors in browser
- ✅ Mobile responsive

### 4. Monitoring

- ✅ Set up error tracking (Sentry, LogRocket, etc.)
- ✅ Monitor email delivery rates in Resend dashboard
- ✅ Check server logs regularly
- ✅ Set up uptime monitoring

## Common Deployment Issues & Solutions

### Issue: Emails not sending

**Solutions:**

1. Verify domain in Resend dashboard
2. Check `RESEND_API_KEY` is set correctly
3. Ensure `RESEND_FROM_EMAIL` matches verified domain
4. Check Resend dashboard for error logs
5. Verify you haven't hit rate limits (3,000/month free tier)

### Issue: Database connection fails

**Solutions:**

1. Check `MONGODB_URI` is correct
2. Whitelist deployment platform IP in MongoDB Atlas
3. Ensure database user has proper permissions
4. Test connection string locally

### Issue: Build fails

**Solutions:**

1. Run `npm run build` locally first
2. Check for TypeScript errors
3. Ensure all dependencies are in `package.json`
4. Check Node version compatibility

### Issue: Environment variables not working

**Solutions:**

1. Restart deployment after adding variables
2. Check variable names match exactly (case-sensitive)
3. Don't use quotes around values in deployment platform
4. Redeploy after changes

### Issue: 404 on routes

**Solutions:**

1. Ensure Next.js is configured correctly
2. Check `next.config.ts` settings
3. Verify file structure matches routes
4. Clear build cache and redeploy

## Rollback Plan

If deployment fails:

1. Revert to previous commit
2. Redeploy from last stable version
3. Check error logs
4. Fix issues locally
5. Test thoroughly before redeploying

## Success Criteria

Deployment is successful when:

- ✅ All pages load without errors
- ✅ Users can register and login
- ✅ Forgot password emails are received
- ✅ Password reset works end-to-end
- ✅ No console errors in production
- ✅ Database operations work correctly
- ✅ All environment variables are set

## Support Resources

- Next.js Docs: https://nextjs.org/docs
- Resend Docs: https://resend.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas
- Vercel Support: https://vercel.com/support

---

**Last Updated:** December 9, 2024
**Version:** 1.0.0
